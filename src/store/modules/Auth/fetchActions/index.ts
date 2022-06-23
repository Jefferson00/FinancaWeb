import { signIn } from "..";
import api from "../../../../config/api";

export const signUp = (user: any) => {
  return (dispatch: any) => {
    api
      .post("users", user)
      .then((res) => {
        dispatch(signIn(res.data));
      })
      .catch(console.log);
  };
};
