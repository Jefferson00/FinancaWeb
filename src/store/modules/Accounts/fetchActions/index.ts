import {
  addAccount,
  addAccounts,
  updateAccountState,
  removeAccountState,
  changeLoadingState,
} from "..";
import api from "../../../../config/api";
import { checkApiError } from "../../../../utils/checkApiError";
import { ICreateAccount, IUpdateAccount } from "../../../interfaces";
import { addMessage } from "../../Feedbacks";

export const listAccounts = (userId: string) => {
  return (dispatch: any) => {
    api
      .get(`accounts/active/user/${userId}`)
      .then((res) => {
        dispatch(addAccounts(res.data));
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

export const createAccount = (account: ICreateAccount) => {
  return (dispatch: any) => {
    dispatch(changeLoadingState(true));
    api
      .post(`accounts`, account)
      .then((res) => {
        dispatch(addAccount(res.data));

        dispatch(
          addMessage({
            type: "success",
            message: "Conta criada com sucesso!",
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

export const updateAccount = (account: IUpdateAccount, accountId: string) => {
  return (dispatch: any) => {
    dispatch(changeLoadingState(true));
    api
      .put(`accounts/${accountId}`, account)
      .then((res) => {
        dispatch(updateAccountState(res.data));

        dispatch(
          addMessage({
            type: "success",
            message: "Conta atualizada com sucesso!",
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

export const deleteAccount = (accountId: string, userId: string) => {
  return (dispatch: any) => {
    dispatch(changeLoadingState(true));
    api
      .delete(`accounts/${accountId}/${userId}`)
      .then((res) => {
        dispatch(removeAccountState(accountId));

        dispatch(
          addMessage({
            type: "success",
            message: "Conta excluída",
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
