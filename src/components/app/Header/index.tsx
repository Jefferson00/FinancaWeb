import { Colors } from "../../../styles/global";
import * as S from "./styles";

import LogoImg from "../../../assets/logo.svg";
import DefaultAvatar from "../../../assets/icons/user.svg";
import { Link } from "react-router-dom";

import { getAuth } from "firebase/auth";
import { app } from "../../../config/firebase";
import { FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import State from "../../../store/interfaces";

import { signOut } from "../../../store/modules/Auth";

const Header = () => {
  const { user } = useSelector((state: State) => state.auth);
  const dispatch = useDispatch<any>();

  const backgroundColor = Colors.BLUE_PRIMARY_LIGHTER;

  const handleSignOut = async () => {
    localStorage.removeItem("@FinancaWeb:token");
    dispatch(signOut({}));
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
          <S.SignOutButton onClick={handleSignOut}>
            <FaSignOutAlt color="#fff" size={28} />
          </S.SignOutButton>
        )}
      </S.UserContainer>
    </S.Container>
  );
};

export default Header;
