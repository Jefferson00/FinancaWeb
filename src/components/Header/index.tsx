import { Colors } from "../../styles/global";
import * as S from "./styles";

import LogoImg from "../../assets/logo.svg";
import DefaultAvatar from "../../assets/icons/user.svg";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStores } from "../../store";

import { getAuth } from "firebase/auth";
import { app } from "../../config/firebase";
import { FaSignOutAlt } from "react-icons/fa";

const Header = observer(() => {
  const { authStore } = useStores();
  const { auth, setUser } = authStore;
  const { user } = auth;

  const backgroundColor = Colors.BLUE_PRIMARY_LIGHTER;

  const signOut = async () => {
    setUser(null);
    const firebaseAuth = getAuth(app);
    await firebaseAuth.signOut();
  };

  return (
    <S.Container backgroundColor={backgroundColor}>
      <Link to="/">
        <S.Logo src={LogoImg} />
      </Link>

      <S.UserContainer>
        <S.Welcome>
          <S.Text>Bem vindo,</S.Text>
          <S.BoldText>{user?.name}</S.BoldText>
        </S.Welcome>

        <S.Avatar src={user?.avatar ? user?.avatar : DefaultAvatar} />

        {user && (
          <S.SignOutButton onClick={signOut}>
            <FaSignOutAlt color="#fff" size={28} />
          </S.SignOutButton>
        )}
      </S.UserContainer>
    </S.Container>
  );
});

export default Header;
