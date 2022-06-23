import { addAccounts } from "..";
import api from "../../../../config/api";

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
