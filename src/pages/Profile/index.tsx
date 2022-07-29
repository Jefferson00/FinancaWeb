import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/app/Header";
import State from "../../store/interfaces";
import * as S from "./styles";
import DefaultAvatar from "../../assets/icons/user.svg";
import Input from "../../components/utils/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserFormData } from "../../utils/formDatas";
import { useEffect } from "react";
import Button from "../../components/utils/Button";
import { FaMoon, FaSave, FaSun } from "react-icons/fa";
import {
  BLUE_PRIMARY,
  BLUE_SECONDARY,
  MAIN_TEXT,
  PRIMARY_INPUT,
} from "../../styles/global";
import { updateProfile } from "../../store/modules/Auth/fetchActions";
import { toggleThemeState } from "../../store/modules/Theme";
import EnvironmentMessage from "../../components/app/EnvironmentMessage";

const schema = yup.object({
  name: yup
    .string()
    .required("Campo obrigátorio")
    .min(2, "deve ter no mínimo 2 caracteres")
    .max(25, "deve ter no máximo 25 caracteres"),
  email: yup.string().required("Campo obrigátorio").email("E-mail inválido"),
});

export const phoneMask = (value: string) => {
  if (value) {
    return value
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/g, "($1) $2")
      .replace(/(\d)(\d{4})$/, "$1-$2");
  } else {
    return "";
  }
};

export default function Profile() {
  const dispatch = useDispatch<any>();
  const { user } = useSelector((state: State) => state.auth);
  const { theme } = useSelector((state: State) => state.themes);

  const firstBackgroundColor = BLUE_PRIMARY;
  const secondBackgroundColor = BLUE_SECONDARY;

  const { control, handleSubmit, setValue } = useForm<UserFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<UserFormData> = (data) => {
    const userInput = {
      ...data,
      phone: data.phone ? `+55${data.phone}` : null,
    };
    dispatch(updateProfile(userInput, user.id));
  };

  const toggleTheme = () => {
    dispatch(toggleThemeState(theme === "light" ? "dark" : "light"));
    localStorage.setItem(
      "@FinancaWeb:theme",
      theme === "light" ? "dark" : "light"
    );
  };

  useEffect(() => {
    setValue("name", user.name);
    setValue("email", user.email);
    setValue("phone", user.phone);
  }, [setValue, user.email, user.name, user.phone]);

  return (
    <div>
      <Header expanded />
      <S.Container>
        <S.AvatarContainer>
          <S.Avatar src={user?.avatar ? user?.avatar : DefaultAvatar} />

          <S.ThemeSwitch
            checked={theme === "dark"}
            onChange={toggleTheme}
            checkedIcon={false}
            uncheckedIcon={false}
            checkedHandleIcon={
              <S.IconContainer>
                <FaMoon size={20} />
              </S.IconContainer>
            }
            uncheckedHandleIcon={
              <S.IconContainer>
                <FaSun color="#fff" size={20} />{" "}
              </S.IconContainer>
            }
            offColor="#FF981E"
            onColor="#262626"
            onHandleColor="#262626"
            offHandleColor="#FF981E"
            height={40}
            width={70}
            handleDiameter={28}
          />
        </S.AvatarContainer>

        <S.FormContainer>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Nome"
              backgroundColor={PRIMARY_INPUT}
              textColor={MAIN_TEXT}
              name="name"
              defaultValue={""}
              control={control}
            />
            <Input
              label="Email"
              backgroundColor={PRIMARY_INPUT}
              textColor={MAIN_TEXT}
              name="email"
              defaultValue={""}
              control={control}
            />
            <Input
              label="Telefone"
              backgroundColor={PRIMARY_INPUT}
              textColor={MAIN_TEXT}
              name="phone"
              placeholder="(99) 9 9999-9999"
              mask={phoneMask}
              defaultValue={""}
              control={control}
              maxLength={15}
            />

            <S.ButtonContainer>
              <Button
                title="Salvar"
                colors={{
                  PRIMARY_BACKGROUND: firstBackgroundColor,
                  SECOND_BACKGROUND: secondBackgroundColor,
                  TEXT: "#fff",
                }}
                icon={() => <FaSave color="#FFF" size={25} />}
                type="submit"
              />
            </S.ButtonContainer>
          </form>
        </S.FormContainer>
      </S.Container>

      <S.Background />
      {process.env.REACT_APP_ENV !== "production" && <EnvironmentMessage />}
    </div>
  );
}
