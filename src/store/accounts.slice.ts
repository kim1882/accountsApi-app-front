import { IAccount, TransactionEnum } from "@/types/Accounts";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import { fetchAccounts } from "@/services/accounts";

interface IAccountsInitialState {
  accounts: IAccount[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
const initialState: IAccountsInitialState = {
  accounts: [],
  status: "idle",
  error: null,
};

const accountsSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loadAccounts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(loadAccounts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.accounts = state.accounts.concat(action.payload);
      })
      .addCase(loadAccounts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export const loadAccounts = createAsyncThunk(
  "accounts/loadAccounts",
  async () => {
    const response = await fetchAccounts();
    return response.data;
  }
);

export const { actions, reducer } = accountsSlice;

export const {} = actions;

export const selectAccounts = (state: RootState) => state.accounts.accounts;
export const selectAccountById = (id: string) => (state: RootState) =>
  state.accounts.accounts.find((item) => item.id === id);
export const selectAccountsStatus = (state: RootState) => state.accounts.status;
export const selectAccountsError = (state: RootState) => state.accounts.error;

export default reducer;
