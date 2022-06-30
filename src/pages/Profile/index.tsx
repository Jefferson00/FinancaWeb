import { useSelector } from "react-redux";
import Header from "../../components/app/Header";
import State from "../../store/interfaces";
import * as S from "./styles";
import DefaultAvatar from "../../assets/icons/user.svg";
import Input from "../../components/utils/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserFormData } from "../../utils/formDatas";
import { useEffect, useState } from "react";
import Button from "../../components/utils/Button";
import { FaMoon, FaSave, FaSun } from "react-icons/fa";
import { Colors } from "../../styles/global";

const schema = yup.object({
  name: yup
    .string()
    .required("Campo obrigátorio")
    .min(2, "deve ter no mínimo 2 caracteres")
    .max(25, "deve ter no máximo 25 caracteres"),
  email: yup.string().required("Campo obrigátorio").email("E-mail inválido"),
});

export default function Profile() {
  const { user } = useSelector((state: State) => state.auth);

  const [themeState, setThemeState] = useState("ligth");

  const firstBackgroundColor = Colors.ORANGE_PRIMARY_LIGHTER;
  const secondBackgroundColor = Colors.ORANGE_SECONDARY_LIGHTER;

  const { control, handleSubmit, setValue } = useForm<UserFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<UserFormData> = (data) => {
    console.log(data);
  };

  const toggleTheme = () => {
    setThemeState((prevState) => (prevState === "ligth" ? "dark" : "ligth"));
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
            checked={themeState === "dark"}
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
            onColor="#ffffff"
            onHandleColor="#ffffff"
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
              backgroundColor="#D4E3F5"
              textColor="#000"
              name="name"
              defaultValue={""}
              control={control}
            />
            <Input
              label="Email"
              backgroundColor="#D4E3F5"
              textColor="#000"
              name="email"
              defaultValue={""}
              control={control}
            />
            <Input
              label="Telefone"
              backgroundColor="#D4E3F5"
              textColor="#000"
              name="phone"
              defaultValue={""}
              control={control}
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
    </div>
  );
}
