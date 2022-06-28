import { addCreditCards } from "..";
import api from "../../../../config/api";

export const listCreditCards = (userId: string) => {
  return (dispatch: any) => {
    api
      .get(`creditCards/user/${userId}`)
      .then((res) => {
        dispatch(addCreditCards(res.data));
      })
      .catch(console.log);
  };
};
