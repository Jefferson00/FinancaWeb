import {
  addAccount,
  addAccounts,
  updateAccountState,
  removeAccountState,
  changeLoadingState,
} from "..";
import api from "../../../../config/api";
import { ICreateAccount, IUpdateAccount } from "../../../interfaces";

export const listAccounts = (userId: string) => {
  return (dispatch: any) => {
    api
      .get(`accounts/active/user/${userId}`)
      .then((res) => {
        dispatch(addAccounts(res.data));
      })
      .catch(console.log);
  };
};

export const createAccount = (account: ICreateAccount) => {
  return (dispatch: any) => {
    dispatch(changeLoadingState(true));
    api
      .post(`accounts`, account)
      .then((res) => {
        dispatch(addAccount(res.data));
      })
      .catch(console.log);
  };
};

export const updateAccount = (account: IUpdateAccount, accountId: string) => {
  return (dispatch: any) => {
    dispatch(changeLoadingState(true));
    api
      .put(`accounts/${accountId}`, account)
      .then((res) => {
        dispatch(updateAccountState(res.data));
      })
      .catch(console.log);
  };
};

export const deleteAccount = (accountId: string, userId: string) => {
  return (dispatch: any) => {
    dispatch(changeLoadingState(true));
    api
      .delete(`accounts/${accountId}/${userId}`)
      .then((res) => {
        dispatch(removeAccountState(accountId));
      })
      .catch(console.log);
  };
};
