import { createAction, createReducer } from "@reduxjs/toolkit";
import { IAccount } from "../../interfaces";

interface AccountState {
  accounts: IAccount[];
  loading: boolean;
}

const INITIAL_STATE: AccountState = {
  accounts: [],
  loading: true,
};

export const addAccount = createAction<IAccount>("ADD_ACCOUNT");
export const addAccounts = createAction<IAccount[]>("ADD_ACCOUNTS");
export const updateAccountState = createAction<IAccount>(
  "UPDATE_ACCOUNT_STATE"
);
export const removeAccountState = createAction<string>("REMOVE_ACCOUNT_STATE");
export const changeLoadingState = createAction<boolean>(
  "CHANGE_ACCOUNTS_LOADING_STATE"
);

export default createReducer(INITIAL_STATE, {
  [addAccount.type]: (state, action) => ({
    ...state,
    loading: false,
    accounts: [...state.accounts, action.payload],
  }),
  [addAccounts.type]: (state, action) => ({
    ...state,
    loading: false,
    accounts: [...action.payload],
  }),
  [updateAccountState.type]: (state, action) => {
    const itemIndex = state.accounts.findIndex(
      (s) => s.id === action.payload.id
    );
    const stateCopy = [...state.accounts];
    stateCopy[itemIndex] = action.payload;
    return { ...state, loading: false, accounts: stateCopy };
  },
  [removeAccountState.type]: (state, action) => ({
    ...state,
    loading: false,
    accounts: state.accounts.filter((s) => s.id !== action.payload),
  }),
  [changeLoadingState.type]: (state, action) => ({
    ...state,
    loading: action.payload,
  }),
});
