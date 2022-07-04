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
  loading: boolean;
}

const INITIAL_STATE: TransactionsState = {
  lastTransactions: [],
  loading: true,
};

export const addLastTransactions = createAction<ITransactions[]>(
  "ADD_LAST_TRANSACTIONS"
);
export const addLastTransaction = createAction<ITransactions>(
  "ADD_LAST_TRANSACTION"
);
export const changeLoadingState = createAction<boolean>(
  "CHANGE_LAST_TRANSACTIOS_LOADING_STATE"
);

export default createReducer(INITIAL_STATE, {
  [addLastTransactions.type]: (state, action) => ({
    ...state,
    loading: false,
    lastTransactions: [...action.payload],
  }),
  [addLastTransaction.type]: (state, action) => ({
    ...state,
    loading: false,
    lastTransactions: [...state.lastTransactions, action.payload],
  }),
  [changeLoadingState.type]: (state, action) => ({
    ...state,
    loading: action.payload,
  }),
});
