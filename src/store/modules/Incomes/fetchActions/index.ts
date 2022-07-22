import {
  addIncome,
  addIncomes,
  changeLoadingState,
  addIncomesOnAccount,
  updateIncomeState,
  addIncomeOnAccount,
  removeIncomeState,
  removeIncomeOnAccountState,
  addCreatedIncome,
} from "..";
import api from "../../../../config/api";
import { checkApiError } from "../../../../utils/checkApiError";
import {
  IAccount,
  ICreateIncome,
  ICreateIncomeOnAccount,
  IUpdateIncome,
} from "../../../interfaces";
import { updateAccountState } from "../../Accounts";
import { addMessage } from "../../Feedbacks";

export const listIncomes = (userId: string) => {
  return (dispatch: any) => {
    api
      .get(`incomes/user/${userId}`)
      .then((res) => {
        dispatch(addIncomes(res.data));
      })
      .catch((e) => {
        dispatch(changeLoadingState(false));
        dispatch(
          addMessage({
            type: "error",
            message: checkApiError(e),
          })
        );
      });
  };
};

export const listIncomesOnAccount = (userId: string) => {
  return (dispatch: any) => {
    api
      .get(`incomesOnAccount/user/${userId}`)
      .then((res) => {
        dispatch(addIncomesOnAccount(res.data));
      })
      .catch((e) => {
        dispatch(changeLoadingState(false));
        dispatch(
          addMessage({
            type: "error",
            message: checkApiError(e),
          })
        );
      });
  };
};

export const createIncome = (income: ICreateIncome, received?: boolean) => {
  return (dispatch: any) => {
    dispatch(changeLoadingState(true));
    api
      .post(`incomes`, income)
      .then((res) => {
        dispatch(addIncome(res.data));
        if (received) dispatch(addCreatedIncome(res.data));
        dispatch(
          addMessage({
            type: "success",
            message: "Entrada criada com sucesso!",
          })
        );
      })
      .catch((e) => {
        dispatch(changeLoadingState(false));
        dispatch(
          addMessage({
            type: "error",
            message: checkApiError(e),
          })
        );
      });
  };
};

export const updateIncome = (income: IUpdateIncome, incomeId: string) => {
  return (dispatch: any) => {
    dispatch(changeLoadingState(true));
    api
      .put(`incomes/${incomeId}`, income)
      .then((res) => {
        dispatch(updateIncomeState(res.data));
        dispatch(
          addMessage({
            type: "success",
            message: "Entrada atualizada com sucesso!",
          })
        );
      })
      .catch((e) => {
        dispatch(changeLoadingState(false));
        dispatch(
          addMessage({
            type: "error",
            message: checkApiError(e),
          })
        );
      });
  };
};

export const deleteIncome = (incomeId: string, userId: string) => {
  return (dispatch: any) => {
    dispatch(changeLoadingState(true));
    api
      .delete(`incomes/${incomeId}/${userId}`)
      .then((res) => {
        dispatch(removeIncomeState(incomeId));
        dispatch(
          addMessage({
            type: "success",
            message: "Entrada excluída",
          })
        );
      })
      .catch((e) => {
        dispatch(changeLoadingState(false));
        dispatch(
          addMessage({
            type: "error",
            message: checkApiError(e),
          })
        );
      });
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
        dispatch(
          addMessage({
            type: "success",
            message: "Entrada recebida com sucesso!",
          })
        );
      })
      .catch((e) => {
        dispatch(changeLoadingState(false));
        dispatch(
          addMessage({
            type: "error",
            message: checkApiError(e),
          })
        );
      });
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
        dispatch(
          addMessage({
            type: "success",
            message: "Recebimento excluído com sucesso!",
          })
        );
      })
      .catch((e) => {
        dispatch(changeLoadingState(false));
        dispatch(
          addMessage({
            type: "error",
            message: checkApiError(e),
          })
        );
      });
  };
};
