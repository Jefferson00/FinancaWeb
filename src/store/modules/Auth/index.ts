import { createAction, createReducer } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  isAuthenticated: !!localStorage.getItem("@FinancaWeb:token"),
  user: {},
};

export const signIn = createAction<any>("SIGN_IN");
export const signOut = createAction<any>("SIGN_OUT");
export const updateUser = createAction<any>("UPDATE_USER");

export default createReducer(INITIAL_STATE, {
  [signIn.type]: (state, action) => ({
    ...state,
    isAuthenticated: true,
    user: action.payload,
  }),
  [signOut.type]: (state, action) => ({
    ...state,
    isAuthenticated: false,
    user: {},
  }),
  [updateUser.type]: (state, action) => ({
    ...state,
    user: action.payload,
  }),
});
