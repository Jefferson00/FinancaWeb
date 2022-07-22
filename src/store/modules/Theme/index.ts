import { createAction, createReducer } from "@reduxjs/toolkit";

export interface ThemeState {
  theme: "light" | "dark";
}

const INITIAL_STATE: ThemeState = {
  theme:
    (localStorage.getItem("@FinancaWeb:theme") as "light" | "dark") || "light",
};

export const toggleThemeState = createAction<"light" | "dark">("TOGGLE_THEME");

export default createReducer(INITIAL_STATE, {
  [toggleThemeState.type]: (state, action) => ({
    ...state,
    theme: action.payload,
  }),
});
