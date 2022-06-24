import { createAction, createReducer } from "@reduxjs/toolkit";
import { IAccount } from "../../interfaces";

const INITIAL_STATE: IAccount[] = [];

export const addAccount = createAction<IAccount>("ADD_ACCOUNT");
export const addAccounts = createAction<IAccount[]>("ADD_ACCOUNTS");
export const updateAccountState = createAction<IAccount>(
  "UPDATE_ACCOUNT_STATE"
);

export default createReducer(INITIAL_STATE, {
  [addAccount.type]: (state, action) => [...state, action.payload],
  [addAccounts.type]: (state, action) => [...action.payload],
  [updateAccountState.type]: (state, action) => {
    const itemIndex = state.findIndex((s) => s.id === action.payload.id);
    const stateCopy = [...state];
    stateCopy[itemIndex] = action.payload;
    return [...stateCopy];
  },
});
