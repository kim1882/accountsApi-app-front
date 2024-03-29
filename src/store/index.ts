import { PreloadedState, configureStore } from "@reduxjs/toolkit";
import accountsReducer from "./accounts.slice";
import { useDispatch } from "react-redux";

export const configStore = {
  reducer: {
    accounts: accountsReducer,
  },
};

const store = configureStore(configStore);

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    ...configStore,
    preloadedState,
  });
}

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppStore = ReturnType<typeof setupStore>;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
