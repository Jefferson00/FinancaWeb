import { addExpanses, addExpansesOnAccount } from "..";
import api from "../../../../config/api";

export const listExpanses = (userId: string) => {
  return (dispatch: any) => {
    api
      .get(`expanses/user/${userId}`)
      .then((res) => {
        dispatch(addExpanses(res.data));
      })
      .catch(console.log);
  };
};

export const listExpansesOnAccount = (userId: string) => {
  return (dispatch: any) => {
    api
      .get(`expansesOnAccount/user/${userId}`)
      .then((res) => {
        dispatch(addExpansesOnAccount(res.data));
      })
      .catch(console.log);
  };
};
