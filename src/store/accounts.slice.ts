import { IAccount, TransactionEnum } from "@/types/Accounts";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import {
  createAccountService,
  deleteAccountService,
  loadAccountsService,
  createTransactionService,
} from "@/services/accounts";

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
      // CREATE ACCOUNT
      .addCase(createAccount.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createAccount.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.accounts = state.accounts.concat(action.payload);
      })
      .addCase(createAccount.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      // LOAD ACCOUNTS
      .addCase(loadAccounts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadAccounts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.accounts = state.accounts.concat(action.payload);
      })
      .addCase(loadAccounts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      // DELETE ACCOUNT
      .addCase(deleteAccount.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { id } = action.payload;
        state.accounts = state.accounts.filter((item) => item.id !== id);
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      // CREATE TRANSACTION
      .addCase(createTransaction.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { id, transactions } = action.payload;
        state.accounts = state.accounts.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              transactions,
            };
          }
          return item;
        });
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export const createAccount = createAsyncThunk(
  "accounts/createAccount",
  async ({ id, name }: { id: string; name: string }) => {
    const response = await createAccountService(id, name);
    return response;
  }
);

export const loadAccounts = createAsyncThunk(
  "accounts/loadAccounts",
  async () => {
    const response = await loadAccountsService();
    return response;
  }
);

export const deleteAccount = createAsyncThunk(
  "accounts/deleteAccount",
  async (id: string) => {
    const response = await deleteAccountService(id);
    return response;
  }
);

export const createTransaction = createAsyncThunk(
  "accounts/createTransaction",
  async ({
    id,
    type,
    amount,
  }: {
    id: string;
    type: TransactionEnum;
    amount: number;
  }) => {
    const response = await createTransactionService(id, type, amount);
    return response;
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
