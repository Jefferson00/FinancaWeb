import { Control, SubmitHandler, UseFormHandleSubmit } from "react-hook-form";
import Button from "../../utils/Button";
import Input from "../../utils/Input";
import Select from "../../utils/Select";
import * as S from "./styles";
import {
  Colors,
  MAIN_TEXT,
  ORANGE_PRIMARY,
  ORANGE_SECONDARY,
  PRIMARY_INPUT,
} from "../../../styles/global";
import State, {
  ICreateAccount,
  IUpdateAccount,
} from "../../../store/interfaces";
import {
  currencyMask,
  currencyToValue,
} from "../../../utils/getCurrencyFormat";
import { useDispatch, useSelector } from "react-redux";
import { FaSave, FaTrash } from "react-icons/fa";
import { accountTypes } from "../../../utils/types";
import {
  createAccount,
  deleteAccount,
  updateAccount,
} from "../../../store/modules/Accounts/fetchActions";
import { useState } from "react";
import Modal from "../../utils/Modal";

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
  const { incomesOnAccount } = useSelector((state: State) => state.incomes);
  const { expansesOnAccount } = useSelector((state: State) => state.expanses);
  const dispatch = useDispatch<any>();
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false);

  const deleteColor = Colors.RED_PRIMARY_LIGHTER;

  const canDelete = () => {
    return (
      !incomesOnAccount.find((i) => i.accountId === accountId) &&
      !expansesOnAccount.find((i) => i.accountId === accountId)
    );
  };

  const handleDelete = async () => {
    if (user && accountId) {
      dispatch(deleteAccount(accountId, user.id));
      setDeleteConfirmationVisible(false);
      onFinish();
    }
  };

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
      initialValue:
        data.initialValue && data.initialValue !== "0"
          ? Number(currencyToValue(data.initialValue))
          : 0,
      userId: user.id,
    };
    dispatch(createAccount(accountToCreate));
    onFinish();
  };

  return (
    <>
      <S.Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Nome"
            backgroundColor={PRIMARY_INPUT}
            textColor={MAIN_TEXT}
            name="name"
            defaultValue={""}
            control={control}
          />

          <Select
            label="Tipo de conta"
            backgroundColor={PRIMARY_INPUT}
            textColor={MAIN_TEXT}
            name="type"
            control={control}
            options={accountTypes}
            defaultValue={accountTypes[0].name}
          />

          <Input
            label="Saldo Inicial"
            backgroundColor={PRIMARY_INPUT}
            textColor={MAIN_TEXT}
            name="initialValue"
            mask={currencyMask}
            defaultValue={"0"}
            control={control}
            disabled={!!accountId}
          />

          <S.ButtonContainer>
            <Button
              title="Salvar"
              colors={{
                PRIMARY_BACKGROUND: ORANGE_PRIMARY,
                SECOND_BACKGROUND: ORANGE_SECONDARY,
                TEXT: "#fff",
              }}
              icon={() => <FaSave color="#FFF" size={25} />}
              type="submit"
            />
            {!!accountId && canDelete() && (
              <S.DeleteButton
                type="button"
                onClick={() => setDeleteConfirmationVisible(true)}
              >
                <FaTrash size={28} color={deleteColor} />
              </S.DeleteButton>
            )}
          </S.ButtonContainer>
        </form>
      </S.Container>

      <Modal
        visible={deleteConfirmationVisible}
        onCancel={() => setDeleteConfirmationVisible(false)}
        overlaid
        type="Delete"
        title="Tem certeza que deseja excluir essa conta?"
        onConfirm={handleDelete}
      />
    </>
  );
}
