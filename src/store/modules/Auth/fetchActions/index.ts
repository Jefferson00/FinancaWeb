import { signIn, updateUser } from "..";
import api from "../../../../config/api";
import { checkApiError } from "../../../../utils/checkApiError";
import { addMessage } from "../../Feedbacks";

export const signUp = (user: any) => {
  return (dispatch: any) => {
    api
      .post("users", user)
      .then((res) => {
        dispatch(signIn(res.data));
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

export const updateProfile = (user: any, userId: string) => {
  return (dispatch: any) => {
    api
      .put(`users/${userId}`, user)
      .then((res) => {
        dispatch(
          updateUser({
            ...res.data,
            phone: res.data.phone ? res.data.phone.replace("+55", "") : null,
          })
        );

        dispatch(
          addMessage({
            type: "success",
            message: "Perfil atualizado com sucesso!",
          })
        );
      })
      .catch((e) => {
        // dispatch(changeLoadingState(false));
        dispatch(
          addMessage({
            type: "error",
            message: checkApiError(e),
          })
        );
      });
  };
};
