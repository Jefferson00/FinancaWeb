import {
  addIncome,
  addIncomes,
  changeLoadingState,
  addIncomesOnAccount,
} from "..";
import api from "../../../../config/api";
import { ICreateIncome } from "../../../interfaces";

export const listIncomes = (userId: string) => {
  return (dispatch: any) => {
    api
      .get(`incomes/user/${userId}`)
      .then((res) => {
        dispatch(addIncomes(res.data));
      })
      .catch(console.log);
  };
};

export const listIncomesOnAccount = (userId: string) => {
  return (dispatch: any) => {
    api
      .get(`incomesOnAccount/user/${userId}`)
      .then((res) => {
        dispatch(addIncomesOnAccount(res.data));
      })
      .catch(console.log);
  };
};

export const createIncome = (income: ICreateIncome) => {
  return (dispatch: any) => {
    dispatch(changeLoadingState(true));
    api
      .post(`incomes`, income)
      .then((res) => {
        dispatch(addIncome(res.data));
      })
      .catch(console.log);
  };
};
