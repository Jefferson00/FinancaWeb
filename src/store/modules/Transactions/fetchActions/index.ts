import { addLastTransactions } from "..";
import api from "../../../../config/api";

export const listLastTransactions = (userId: string) => {
  return (dispatch: any) => {
    api
      .get(`users/lastTransactions/${userId}`)
      .then((res) => {
        dispatch(addLastTransactions(res.data));
      })
      .catch(console.log);
  };
};
