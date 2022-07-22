import { Colors } from "../../styles/global";
import LogoImg from "../../assets/logo.svg";
import * as S from "./styles";
import Button from "../../components/utils/Button";
import { FaGoogle } from "react-icons/fa";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../../config/firebase";
import api from "../../config/api";
import { HeadersDefaults } from "axios";
import { useDispatch } from "react-redux";
import { signIn } from "../../store/modules/Auth";
import { signUp } from "../../store/modules/Auth/fetchActions";
import { addMessage } from "../../store/modules/Feedbacks";
import { checkApiError } from "../../utils/checkApiError";

interface CommonHeaderProperties extends HeadersDefaults {
  authorization: string;
}

const Login = () => {
  const backgroundColor = Colors.BLUE_PRIMARY_LIGHTER;
  const googlePrimary = Colors.ORANGE_PRIMARY_LIGHTER;
  const googleSecondary = Colors.ORANGE_SECONDARY_LIGHTER;

  const dispatch = useDispatch<any>();

  async function signInWithGoogle() {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const result = await signInWithPopup(auth, provider);

    if (result.user) {
      const { displayName, photoURL, email, phoneNumber } = result.user;

      if (!displayName || !photoURL) {
        throw new Error("Missing information from Google Account.");
      }

      const token = await result.user.getIdToken();

      api.defaults.headers = {
        authorization: `Bearer ${token}`,
      } as CommonHeaderProperties;

      const userInput = {
        avatar: photoURL,
        email: email,
        name: displayName,
        phone: phoneNumber,
      };

      api
        .get(`users/email/${email}`)
        .then(({ data }) => {
          if (!data) {
            dispatch(signUp(userInput));
          } else {
            dispatch(
              signIn({
                ...data,
                phone: data.phone ? data.phone.replace("+55", "") : null,
                avatar: data.avatar ? data.avatar : photoURL,
              })
            );
          }
          localStorage.setItem("@FinancaWeb:token", token);
        })
        .catch((err) => {
          dispatch(
            addMessage({
              type: "error",
              message: checkApiError(err),
            })
          );
        });
    }
  }

  return (
    <S.Container backgroundColor={backgroundColor}>
      <S.TextSection>
        <S.Logo src={LogoImg} />

        <S.Title>Controle suas finanças de um jeito simples</S.Title>
      </S.TextSection>
      <S.ActionSection>
        <S.ButtonContainer>
          <Button
            title="Entrar"
            colors={{
              PRIMARY_BACKGROUND: googleSecondary,
              SECOND_BACKGROUND: googlePrimary,
              TEXT: "#fff",
            }}
            icon={() => <FaGoogle color="#FFF" size={25} />}
            onClick={signInWithGoogle}
          />
        </S.ButtonContainer>
      </S.ActionSection>
    </S.Container>
  );
};

export default Login;
