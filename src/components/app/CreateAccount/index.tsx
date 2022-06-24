import { Control, SubmitHandler, UseFormHandleSubmit } from "react-hook-form";
import Button from "../../utils/Button";
import Input from "../../utils/Input";
import Select from "../../utils/Select";
import * as S from "./styles";
import { Colors } from "../../../styles/global";
import State, {
  ICreateAccount,
  IUpdateAccount,
} from "../../../store/interfaces";
import {
  currencyMask,
  currencyToValue,
} from "../../../utils/getCurrencyFormat";
import { useDispatch, useSelector } from "react-redux";
import { FaSave } from "react-icons/fa";
import { accountTypes } from "../../../utils/types";
import {
  createAccount,
  updateAccount,
} from "../../../store/modules/Accounts/fetchActions";

type FormData = {
  name: string;
  type: string;
  status: string;
  initialValue?: string;
};

interface CreateAccountProps {
  control: Control<FormData>;
  handleSubmit: UseFormHandleSubmit<FormData>;
  accountId?: string;
  onFinish: () => void;
}

export default function CreateAccount({
  control,
  accountId,
  handleSubmit,
  onFinish,
}: CreateAccountProps) {
  const { user } = useSelector((state: State) => state.auth);
  const dispatch = useDispatch<any>();

  const firstBackgroundColor = Colors.ORANGE_PRIMARY_LIGHTER;
  const secondBackgroundColor = Colors.ORANGE_SECONDARY_LIGHTER;

  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (!!accountId) {
      const accountToUpdate: IUpdateAccount = {
        ...data,
        userId: user.id,
      };
      dispatch(updateAccount(accountToUpdate, accountId));
      onFinish();
      return;
    }
    const accountToCreate: ICreateAccount = {
      ...data,
      status: "active",
      initialValue: Number(currencyToValue(data.initialValue || "0")),
      userId: user.id,
    };
    dispatch(createAccount(accountToCreate));
    onFinish();
  };

  return (
    <S.Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Nome"
          backgroundColor="#D4E3F5"
          textColor="#000"
          name="name"
          defaultValue={""}
          control={control}
        />

        <Select
          label="Tipo de conta"
          backgroundColor="#D4E3F5"
          textColor="#000"
          name="type"
          control={control}
          options={accountTypes}
          defaultValue={accountTypes[0].name}
        />

        <Input
          label="Saldo Inicial"
          backgroundColor="#D4E3F5"
          textColor="#000"
          name="initialValue"
          mask={currencyMask}
          defaultValue={"0"}
          control={control}
        />

        <div style={{ maxWidth: "17rem", margin: "3.5rem auto 0 auto" }}>
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
        </div>
      </form>
    </S.Container>
  );
}
