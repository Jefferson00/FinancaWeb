import { createAction, createReducer } from "@reduxjs/toolkit";

const INITIAL_STATE = "Home";

export const changeMenu = createAction<string>("CHANGE_MENU");

export default createReducer(INITIAL_STATE, {
  [changeMenu.type]: (state, action) => action.payload,
});
