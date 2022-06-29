import {
  addIncome,
  addIncomes,
  changeLoadingState,
  addIncomesOnAccount,
  updateIncomeState,
  addIncomeOnAccount,
  removeIncomeState,
  removeIncomeOnAccountState,
} from "..";
import api from "../../../../config/api";
import {
  IAccount,
  ICreateIncome,
  ICreateIncomeOnAccount,
  IUpdateIncome,
} from "../../../interfaces";
import { updateAccountState } from "../../Accounts";

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

export const updateIncome = (account: IUpdateIncome, incomeId: string) => {
  return (dispatch: any) => {
    dispatch(changeLoadingState(true));
    api
      .put(`incomes/${incomeId}`, account)
      .then((res) => {
        dispatch(updateIncomeState(res.data));
      })
      .catch(console.log);
  };
};

export const deleteIncome = (incomeId: string, userId: string) => {
  return (dispatch: any) => {
    dispatch(changeLoadingState(true));
    api
      .delete(`incomes/${incomeId}/${userId}`)
      .then((res) => {
        dispatch(removeIncomeState(incomeId));
      })
      .catch(console.log);
  };
};

export const createIncomeOnAccount = (
  incomeOnAccount: ICreateIncomeOnAccount,
  account: IAccount
) => {
  return (dispatch: any) => {
    dispatch(changeLoadingState(true));
    api
      .post(`incomesOnAccount`, incomeOnAccount)
      .then((res) => {
        dispatch(addIncomeOnAccount(res.data));

        const accountUpdated = {
          ...account,
          balance: account.balance + res.data.value,
          incomesOnAccount: [...account.incomesOnAccount, res.data],
        };

        dispatch(updateAccountState(accountUpdated));
      })
      .catch(console.log);
  };
};

export const deleteIncomeOnAccount = (
  incomeOnAccountId: string,
  userId: string,
  account: IAccount
) => {
  return (dispatch: any) => {
    dispatch(changeLoadingState(true));
    api
      .delete(`incomesOnAccount/${incomeOnAccountId}/${userId}`)
      .then((res) => {
        dispatch(removeIncomeOnAccountState(incomeOnAccountId));

        const accountUpdated = {
          ...account,
          balance: account.balance - res.data.value,
          incomesOnAccount: [
            ...account.incomesOnAccount.filter((i) => i.id !== res.data.id),
          ],
        };

        dispatch(updateAccountState(accountUpdated));
      })
      .catch(console.log);
  };
};
