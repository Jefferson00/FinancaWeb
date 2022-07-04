import { addLastTransactions } from "..";
import api from "../../../../config/api";
import { checkApiError } from "../../../../utils/checkApiError";
import { addMessage } from "../../Feedbacks";

export const listLastTransactions = (userId: string) => {
  return (dispatch: any) => {
    api
      .get(`users/lastTransactions/${userId}`)
      .then((res) => {
        dispatch(addLastTransactions(res.data));
      })
      .catch((e) => {
        dispatch(
          addMessage({
            type: "error",
            message: checkApiError(e),
          })
        );
      });
  };
};
