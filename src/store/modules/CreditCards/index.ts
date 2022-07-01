import { createAction, createReducer } from "@reduxjs/toolkit";
import { ICreditCard, IInvoice } from "../../interfaces";

export interface CreditCardsState {
  creditCards: ICreditCard[];
  loading: boolean;
  cardSelected: ICreditCard;
  invoiceSelected: IInvoice;
  paidInvoiceSelected: IInvoice;
  expanseOnInvoiceDays: number[];
  paidExpanseOnInvoiceDays: number[];
}

const INITIAL_STATE: CreditCardsState = {
  creditCards: [],
  loading: true,
  cardSelected: {} as ICreditCard,
  invoiceSelected: {} as IInvoice,
  paidInvoiceSelected: {} as IInvoice,
  expanseOnInvoiceDays: [],
  paidExpanseOnInvoiceDays: [],
};

export const addCreditCard = createAction<ICreditCard>("ADD_CREDIT_CARD");
export const addCreditCards = createAction<ICreditCard[]>("ADD_CREDIT_CARDS");
export const selectCreditCard = createAction<ICreditCard>("SELECT_CREDIT_CARD");
export const selectInvoice = createAction<IInvoice>("SELECT_INVOICE");
export const addDays = createAction<number[]>("ADD_DAYS");
export const selectPaidInvoice = createAction<IInvoice>("SELECT_PAID_INVOICE");
export const addPaidDays = createAction<number[]>("ADD_PAID_DAYS");
export const updateCreditCardState = createAction<ICreditCard>(
  "UPDATE_CREDIT_CARD_STATE"
);
export const changeCardLoadingState = createAction<boolean>(
  "CHANGE_CARD_LOADING_STATE"
);

export default createReducer(INITIAL_STATE, {
  [changeCardLoadingState.type]: (state, action) => ({
    ...state,
    loading: action.payload,
  }),
  [addCreditCard.type]: (state, action) => ({
    ...state,
    loading: false,
    creditCards: [...state.creditCards, action.payload],
  }),
  [addCreditCards.type]: (state, action) => ({
    ...state,
    loading: false,
    creditCards: [...action.payload],
  }),
  [selectCreditCard.type]: (state, action) => ({
    ...state,
    loading: false,
    cardSelected: action.payload,
  }),
  [selectInvoice.type]: (state, action) => ({
    ...state,
    loading: false,
    invoiceSelected: action.payload,
  }),
  [addDays.type]: (state, action) => ({
    ...state,
    loading: false,
    expanseOnInvoiceDays: [...action.payload],
  }),
  [selectPaidInvoice.type]: (state, action) => ({
    ...state,
    loading: false,
    paidInvoiceSelected: action.payload,
  }),
  [addPaidDays.type]: (state, action) => ({
    ...state,
    loading: false,
    paidExpanseOnInvoiceDays: [...action.payload],
  }),
  [updateCreditCardState.type]: (state, action) => {
    const itemIndex = state.creditCards.findIndex(
      (c) => c.id === action.payload.id
    );
    const stateCopy = [...state.creditCards];
    stateCopy[itemIndex] = action.payload;
    return { ...state, loading: false, creditCards: stateCopy };
  },
});
