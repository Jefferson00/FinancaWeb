import { observer } from "mobx-react-lite";
import { Colors } from "../../styles/global";
import LogoImg from "../../assets/logo.svg";
import * as S from "./styles";
import Button from "../../components/Button";
import { FaGoogle } from "react-icons/fa";

import { useStores } from "../../store";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../../config/firebase";
import api from "../../config/api";
import { HeadersDefaults } from "axios";

interface CommonHeaderProperties extends HeadersDefaults {
  authorization: string;
}

const Login = observer(() => {
  const backgroundColor = Colors.BLUE_PRIMARY_LIGHTER;
  const googlePrimary = Colors.ORANGE_PRIMARY_LIGHTER;
  const googleSecondary = Colors.ORANGE_SECONDARY_LIGHTER;

  const { authStore } = useStores();
  const { auth: StateAuth, setUser } = authStore;
  const { user } = StateAuth;

  async function signInWithGoogle() {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const result = await signInWithPopup(auth, provider);

    if (result.user) {
      const { displayName, photoURL, uid, email, phoneNumber } = result.user;

      if (!displayName || !photoURL) {
        throw new Error("Missing information from Google Account.");
      }

      const token = await result.user.getIdToken();

      const userInput = {
        avatar: photoURL,
        email: email,
        name: displayName,
        phone: phoneNumber,
      };

      api.defaults.headers = {
        authorization: `Bearer ${token}`,
      } as CommonHeaderProperties;

      api
        .get(`users/email/${email}`)
        .then(({ data }) => {
          console.log("usuario encontrado com email", data);
          if (!data) {
            api
              .post("users", userInput)
              .then(({ data: dataCreated }) => {
                setUser({
                  ...dataCreated,
                  phone: dataCreated.phone
                    ? dataCreated.phone.replace("+55", "")
                    : null,
                });
                return;
              })
              .catch((err) => console.log("erro ao criar usuário:", err));
          } else {
            setUser({
              ...data,
              phone: data.phone ? data.phone.replace("+55", "") : null,
              avatar: data.avatar ? data.avatar : photoURL,
            });
            return;
          }
        })
        .catch((err) => {
          console.log("erro ao encontrar usuário com email", err);
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
});

export default Login;
