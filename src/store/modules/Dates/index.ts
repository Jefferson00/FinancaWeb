import { createAction, createReducer } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  selectedMonth: new Date(),
};

export const changeMonth = createAction<Date>("CHANGE_MONTH");

export default createReducer(INITIAL_STATE, {
  [changeMonth.type]: (state, action) => ({
    ...state,
    selectedMonth: action.payload,
  }),
});
