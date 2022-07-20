import { createAction, createReducer } from "@reduxjs/toolkit";
import { IExpanses, IExpansesOnAccount } from "../../interfaces";

export interface ExpansesState {
  expanses: IExpanses[];
  expansesOnAccount: IExpansesOnAccount[];
  loading: boolean;
  expanseCreated: IExpanses | null;
}

const INITIAL_STATE: ExpansesState = {
  expanses: [],
  expansesOnAccount: [],
  loading: true,
  expanseCreated: null,
};

export const changeLoadingState = createAction<boolean>(
  "CHANGE_EXPANSES_LOADING_STATE"
);
export const addExpanse = createAction<IExpanses>("ADD_EXPANSE");
export const addCreatedExpanse = createAction<IExpanses>("ADD_CREATED_EXPANSE");
export const addExpanses = createAction<IExpanses[]>("ADD_EXPANSES");
export const updateExpanseState = createAction<IExpanses>(
  "UPDATE_EXPANSE_STATE"
);
export const removeExpanseState = createAction<string>("REMOVE_EXPANSE_STATE");

export const addExpanseOnAccount = createAction<IExpansesOnAccount>(
  "ADD_EXPANSE_ON_ACCOUNT"
);
export const addExpansesOnAccount = createAction<IExpansesOnAccount[]>(
  "ADD_EXPANSES_ON_ACCOUNT"
);
export const removeExpanseOnAccountState = createAction<string>(
  "REMOVE_EXPANSE_ON_ACCOUNT_STATE"
);

export default createReducer(INITIAL_STATE, {
  [changeLoadingState.type]: (state, action) => ({
    ...state,
    loading: action.payload,
  }),
  [addExpanse.type]: (state, action) => ({
    ...state,
    loading: false,
    expanses: [...state.expanses, action.payload],
  }),
  [addCreatedExpanse.type]: (state, action) => ({
    ...state,
    expanseCreated: action.payload,
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
    expanseCreated: null,
  }),
  [addExpansesOnAccount.type]: (state, action) => ({
    ...state,
    loading: false,
    expansesOnAccount: [...action.payload],
    expanseCreated: null,
  }),
  [updateExpanseState.type]: (state, action) => {
    const itemIndex = state.expanses.findIndex(
      (s) => s.id === action.payload.id
    );
    const stateCopy = [...state.expanses];
    stateCopy[itemIndex] = action.payload;
    return { ...state, loading: false, expanses: stateCopy };
  },
  [removeExpanseState.type]: (state, action) => ({
    ...state,
    loading: false,
    expanses: state.expanses.filter((s) => s.id !== action.payload),
  }),
  [removeExpanseOnAccountState.type]: (state, action) => ({
    ...state,
    loading: false,
    expansesOnAccount: state.expansesOnAccount.filter(
      (s) => s.id !== action.payload
    ),
  }),
});
