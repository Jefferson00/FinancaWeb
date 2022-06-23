import { createAction, createReducer } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  isAuthenticated: !!localStorage.getItem("token"),
  user: {},
};

export const signIn = createAction<any>("SIGN_IN");
export const signOut = createAction<any>("SIGN_OUT");

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
});
