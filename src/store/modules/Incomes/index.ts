import { createAction, createReducer } from "@reduxjs/toolkit";
import { IIncomes, IIncomesOnAccount } from "../../interfaces";

interface IncomesState {
  incomes: IIncomes[];
  incomesOnAccount: IIncomesOnAccount[];
  loading: boolean;
  incomeCreated: IIncomes | null;
}

const INITIAL_STATE: IncomesState = {
  incomes: [],
  incomesOnAccount: [],
  loading: true,
  incomeCreated: null,
};

export const addIncome = createAction<IIncomes>("ADD_INCOME");
export const addIncomes = createAction<IIncomes[]>("ADD_INCOMES");
export const updateIncomeState = createAction<IIncomes>("UPDATE_INCOME_STATE");
export const removeIncomeState = createAction<string>("REMOVE_INCOME_STATE");
export const changeLoadingState = createAction<boolean>(
  "CHANGE_INCOMES_LOADING_STATE"
);

export const addIncomeOnAccount = createAction<IIncomes>(
  "ADD_INCOME_ON_ACCOUNT"
);
export const addIncomesOnAccount = createAction<IIncomes[]>(
  "ADD_INCOMES_ON_ACCOUNT"
);
export const removeIncomeOnAccountState = createAction<string>(
  "REMOVE_INCOME_ON_ACCOUNT_STATE"
);

export default createReducer(INITIAL_STATE, {
  [addIncome.type]: (state, action) => ({
    ...state,
    loading: false,
    incomes: [...state.incomes, action.payload],
    incomeCreated: action.payload,
  }),
  [addIncomes.type]: (state, action) => ({
    ...state,
    loading: false,
    incomes: [...action.payload],
  }),
  [updateIncomeState.type]: (state, action) => {
    const itemIndex = state.incomes.findIndex(
      (s) => s.id === action.payload.id
    );
    const stateCopy = [...state.incomes];
    stateCopy[itemIndex] = action.payload;
    return { ...state, loading: false, incomes: stateCopy };
  },
  [removeIncomeState.type]: (state, action) => ({
    ...state,
    loading: false,
    incomes: state.incomes.filter((s) => s.id !== action.payload),
  }),
  [changeLoadingState.type]: (state, action) => ({
    ...state,
    loading: action.payload,
  }),

  [addIncomeOnAccount.type]: (state, action) => ({
    ...state,
    loading: false,
    incomesOnAccount: [...state.incomesOnAccount, action.payload],
  }),
  [addIncomesOnAccount.type]: (state, action) => ({
    ...state,
    loading: false,
    incomesOnAccount: [...action.payload],
    incomeCreated: null,
  }),
  [removeIncomeOnAccountState.type]: (state, action) => ({
    ...state,
    loading: false,
    incomesOnAccount: state.incomesOnAccount.filter(
      (s) => s.id !== action.payload
    ),
  }),
});
