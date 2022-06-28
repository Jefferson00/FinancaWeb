import { createAction, createReducer } from "@reduxjs/toolkit";
import { IExpanses, IExpansesOnAccount } from "../../interfaces";

export interface ExpansesState {
  expanses: IExpanses[];
  expansesOnAccount: IExpansesOnAccount[];
  loading: boolean;
}

const INITIAL_STATE: ExpansesState = {
  expanses: [],
  expansesOnAccount: [],
  loading: true,
};

export const addExpanse = createAction<IExpanses>("ADD_EXPANSE");
export const addExpanses = createAction<IExpanses[]>("ADD_EXPANSES");

export const addExpanseOnAccount = createAction<IExpansesOnAccount>(
  "ADD_EXPANSE_ON_ACCOUNT"
);
export const addExpansesOnAccount = createAction<IExpansesOnAccount[]>(
  "ADD_EXPANSES_ON_ACCOUNT"
);

export default createReducer(INITIAL_STATE, {
  [addExpanse.type]: (state, action) => ({
    ...state,
    loading: false,
    expanses: [...state.expanses, action.payload],
  }),
  [addExpanses.type]: (state, action) => ({
    ...state,
    loading: false,
    expanses: [...action.payload],
  }),
  [addExpanseOnAccount.type]: (state, action) => ({
    ...state,
    loading: false,
    expansesOnAccount: [...state.expansesOnAccount, action.payload],
  }),
  [addExpansesOnAccount.type]: (state, action) => ({
    ...state,
    loading: false,
    expansesOnAccount: [...action.payload],
  }),
});
