import {
  addCreditCard,
  addCreditCards,
  changeCardLoadingState,
  removeCreditCardState,
  updateCreditCardState,
} from "..";
import api from "../../../../config/api";
import { checkApiError } from "../../../../utils/checkApiError";
import { ICreateCreditCard, IUpdateCreditCard } from "../../../interfaces";
import { addMessage } from "../../Feedbacks";

export const listCreditCards = (userId: string) => {
  return (dispatch: any) => {
    api
      .get(`creditCards/user/${userId}`)
      .then((res) => {
        dispatch(addCreditCards(res.data));
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

export const createCreditCard = (card: ICreateCreditCard) => {
  return (dispatch: any) => {
    dispatch(changeCardLoadingState(true));
    api
      .post(`creditCards`, card)
      .then((res) => {
        dispatch(addCreditCard(res.data));
        dispatch(
          addMessage({
            type: "success",
            message: "Cartão criado com sucesso!",
          })
        );
      })
      .catch((e) => {
        dispatch(changeCardLoadingState(false));
        dispatch(
          addMessage({
            type: "error",
            message: checkApiError(e),
          })
        );
      });
  };
};

export const updateCreditCard = (card: IUpdateCreditCard, cardId: string) => {
  return (dispatch: any) => {
    dispatch(changeCardLoadingState(true));
    api
      .put(`creditCards/${cardId}`, card)
      .then((res) => {
        dispatch(updateCreditCardState(res.data));
        dispatch(
          addMessage({
            type: "success",
            message: "Cartão atualizado com sucesso!",
          })
        );
      })
      .catch((e) => {
        dispatch(changeCardLoadingState(false));
        dispatch(
          addMessage({
            type: "error",
            message: checkApiError(e),
          })
        );
      });
  };
};

export const deleteCreditCard = (cardId: string, userId: string) => {
  return (dispatch: any) => {
    dispatch(changeCardLoadingState(true));
    api
      .delete(`creditCards/${cardId}/${userId}`)
      .then((res) => {
        dispatch(removeCreditCardState(cardId));
        dispatch(
          addMessage({
            type: "success",
            message: "Cartão excluído",
          })
        );
      })
      .catch((e) => {
        dispatch(changeCardLoadingState(false));
        dispatch(
          addMessage({
            type: "error",
            message: checkApiError(e),
          })
        );
      });
  };
};
