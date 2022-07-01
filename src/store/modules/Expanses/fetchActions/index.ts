import {
  addExpanse,
  addExpanseOnAccount,
  addExpanses,
  addExpansesOnAccount,
  changeLoadingState,
  removeExpanseOnAccountState,
  removeExpanseState,
  updateExpanseState,
} from "..";
import api from "../../../../config/api";
import { checkApiError } from "../../../../utils/checkApiError";
import {
  IAccount,
  ICreateExpanse,
  ICreateExpanseOnAccount,
  IUpdateExpanse,
} from "../../../interfaces";
import { updateAccountState } from "../../Accounts";
import { changeCardLoadingState } from "../../CreditCards";
import { listCreditCards } from "../../CreditCards/fetchActions";
import { addMessage } from "../../Feedbacks";

export const listExpanses = (userId: string) => {
  return (dispatch: any) => {
    api
      .get(`expanses/user/${userId}`)
      .then((res) => {
        dispatch(addExpanses(res.data));
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

export const listExpansesOnAccount = (userId: string) => {
  return (dispatch: any) => {
    api
      .get(`expansesOnAccount/user/${userId}`)
      .then((res) => {
        dispatch(addExpansesOnAccount(res.data));
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

export const createExpanse = (expanse: ICreateExpanse) => {
  return (dispatch: any) => {
    dispatch(changeLoadingState(true));
    api
      .post(`expanses`, expanse)
      .then((res) => {
        dispatch(addExpanse(res.data));
        dispatch(
          addMessage({
            type: "success",
            message: "Despesa criada com sucesso!",
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

export const updateExpanse = (
  expanse: IUpdateExpanse,
  expanseId: string,
  fromInvoice: boolean
) => {
  return (dispatch: any) => {
    dispatch(changeLoadingState(true));
    if (fromInvoice) {
      dispatch(changeCardLoadingState(true));
    }
    api
      .put(`expanses/${expanseId}`, expanse)
      .then((res) => {
        dispatch(updateExpanseState(res.data));
        if (fromInvoice) {
          dispatch(listCreditCards(expanse.userId));
        }
        dispatch(
          addMessage({
            type: "success",
            message: "Despesa atualizada com sucesso!",
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

export const deleteExpanse = (expanseId: string, userId: string) => {
  return (dispatch: any) => {
    dispatch(changeLoadingState(true));
    api
      .delete(`expanses/${expanseId}/${userId}`)
      .then((res) => {
        dispatch(removeExpanseState(expanseId));
        dispatch(
          addMessage({
            type: "success",
            message: "Despesa excluída",
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

export const createExpanseOnAccount = (
  expanseOnAccount: ICreateExpanseOnAccount,
  account: IAccount
) => {
  return (dispatch: any) => {
    dispatch(changeLoadingState(true));
    api
      .post(`expansesOnAccount`, expanseOnAccount)
      .then((res) => {
        dispatch(addExpanseOnAccount(res.data));

        const accountUpdated = {
          ...account,
          balance: account.balance - res.data.value,
          expansesOnAccount: [...account.expansesOnAccount, res.data],
        };

        dispatch(updateAccountState(accountUpdated));
        dispatch(
          addMessage({
            type: "success",
            message: "Despesa paga com sucesso!",
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

export const deleteExpanseOnAccount = (
  expanseOnAccountId: string,
  userId: string,
  account: IAccount
) => {
  return (dispatch: any) => {
    dispatch(changeLoadingState(true));
    api
      .delete(`expansesOnAccount/${expanseOnAccountId}/${userId}`)
      .then((res) => {
        dispatch(removeExpanseOnAccountState(expanseOnAccountId));

        const accountUpdated = {
          ...account,
          balance: account.balance + res.data.value,
          expansesOnAccount: [
            ...account.expansesOnAccount.filter((i) => i.id !== res.data.id),
          ],
        };

        dispatch(updateAccountState(accountUpdated));
        dispatch(
          addMessage({
            type: "success",
            message: "Pagamento excluído com sucesso!",
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
