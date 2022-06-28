import { createAction, createReducer } from "@reduxjs/toolkit";

export interface ITransactions {
  id: string;
  title: string;
  value: number;
  paymentDate: Date;
  category: string;
  type: "Expanse" | "Income";
}

export interface TransactionsState {
  lastTransactions: ITransactions[];
}

const INITIAL_STATE: TransactionsState = {
  lastTransactions: [],
};

export const addLastTransactions = createAction<ITransactions[]>(
  "ADD_LAST_TRANSACTIONS"
);
export const addLastTransaction = createAction<ITransactions>(
  "ADD_LAST_TRANSACTION"
);

export default createReducer(INITIAL_STATE, {
  [addLastTransactions.type]: (state, action) => ({
    ...state,
    lastTransactions: [...action.payload],
  }),
  [addLastTransaction.type]: (state, action) => ({
    ...state,
    lastTransactions: [...state.lastTransactions, action.payload],
  }),
});
