import { createAction, createReducer } from "@reduxjs/toolkit";
import { IAccount } from "../../interfaces";

const INITIAL_STATE: IAccount[] = [];

export const addAccount = createAction("ADD_ACCOUNT");
export const addAccounts = createAction("ADD_ACCOUNTS");

export default createReducer(INITIAL_STATE, {
  [addAccount.type]: (state, action) => [...state, action.payload],
  [addAccounts.type]: (state, action) => [...action.payload],
});
