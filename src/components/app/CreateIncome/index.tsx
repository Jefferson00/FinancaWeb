import { Control, SubmitHandler, UseFormHandleSubmit } from "react-hook-form";
import Button from "../../utils/Button";
import Input from "../../utils/Input";
import Select from "../../utils/Select";
import Switch from "react-switch";
import * as S from "./styles";
import { Colors } from "../../../styles/global";
import State from "../../../store/interfaces";
import { currencyMask } from "../../../utils/getCurrencyFormat";
import { useDispatch, useSelector } from "react-redux";
import { FaCheck, FaSave, FaTrash } from "react-icons/fa";
import { IncomeCategories } from "../../../utils/types";
import { FiAlertCircle } from "react-icons/fi";
import { useState } from "react";
import Modal from "../../utils/Modal";
import SelectButton from "../../utils/SelectButton";
import { format, isSameMonth } from "date-fns";
import DatePicker from "../../utils/DatePicker";

type FormData = {
  name: string;
  value: string;
  status: boolean;
  receiptDefault: string;
  category: string | number;
};

interface CreateIncomeProps {
  control: Control<FormData>;
  handleSubmit: UseFormHandleSubmit<FormData>;
  incomeId?: string;
  onFinish: () => void;
}

export default function CreateIncome({
  control,
  incomeId,
  handleSubmit,
  onFinish,
}: CreateIncomeProps) {
  const { user } = useSelector((state: State) => state.auth);
  const { selectedMonth } = useSelector((state: State) => state.dates);
  const { accounts } = useSelector((state: State) => state.accounts);

  const dispatch = useDispatch<any>();

  const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false);
  const [recurrence, setRecurrence] = useState<"Mensal" | "Parcelada">(
    "Parcelada"
  );
  const [received, setReceived] = useState(false);

  const firstBackgroundColor = Colors.GREEN_PRIMARY_LIGHTER;
  const secondBackgroundColor = Colors.GREEN_SECONDARY_LIGHTER;
  const deleteColor = Colors.RED_PRIMARY_LIGHTER;
  const cancelButtonColor = Colors.BLUE_PRIMARY_LIGHTER;
  const okButtonColor = Colors.RED_PRIMARY_LIGHTER;

  const handleDelete = async () => {
    if (user && incomeId) {
      // dispatch(deleteIncome(incomeId, user.id));
      setDeleteConfirmationVisible(false);
      onFinish();
    }
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    if (!!incomeId) {
      /* const incomeToUpdate: IUpdateIncome = {
        ...data,
        userId: user.id,
      };
      dispatch(updateIncome(incomeToUpdate, incomeId)); */
      onFinish();
      return;
    }
    /* const incomeToCreate: ICreateIncome = {
      ...data,
      value: Number(currencyToValue(data.value)),
      userId: user.id,
    };
    dispatch(createIncome(incomeToCreate)); */
    onFinish();
  };

  return (
    <>
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

          <Input
            label="Valor"
            backgroundColor="#D4E3F5"
            textColor="#000"
            name="value"
            mask={currencyMask}
            defaultValue={"0"}
            control={control}
          />

          <S.Col>
            <S.Label color="#000">Recorrência</S.Label>
            <S.Row>
              <SelectButton
                type="button"
                backgroundColor="#E2EDF0"
                color="#262626"
                icon={() => <FaCheck color="#FFF" size={25} />}
                title="Mensal"
                checked={recurrence === "Mensal"}
                onClick={() => setRecurrence("Mensal")}
              />
              <SelectButton
                type="button"
                backgroundColor="#E2EDF0"
                color="#262626"
                icon={() => <FaCheck color="#FFF" size={25} />}
                title="Parcelada"
                checked={recurrence === "Parcelada"}
                onClick={() => setRecurrence("Parcelada")}
              />
              <Input
                backgroundColor="#D4E3F5"
                textColor="#000"
                name="interation"
                maxLength={2}
                defaultValue={0}
                disabled={recurrence === "Mensal"}
                prefix="x"
                type="number"
                control={control}
              />
            </S.Row>
          </S.Col>

          <S.Row>
            <S.Col>
              <DatePicker
                label="Data de recebimento"
                backgroundColor="#D4E3F5"
                textColor="#000"
                name="startDate"
                defaultValue={format(new Date(), "yyyy-MM-dd")}
                control={control}
              />
            </S.Col>

            <S.Col style={{ alignItems: "flex-end" }}>
              {isSameMonth(new Date(), selectedMonth) && !incomeId && (
                <>
                  <S.Label
                    color="#000"
                    style={{ width: "100%", textAlign: "right" }}
                  >
                    Recebido
                  </S.Label>

                  <Switch
                    checked={received}
                    onChange={() => setReceived(!received)}
                    checkedIcon={false}
                    uncheckedIcon={false}
                    offColor="#d2d2d2"
                    onColor="#76B4B8"
                    onHandleColor="#1A8289"
                    offHandleColor="#76B4B8"
                    height={13}
                    width={31}
                    handleDiameter={20}
                  />
                </>
              )}
            </S.Col>
          </S.Row>

          <Select
            label="Conta de recebimento"
            backgroundColor="#D4E3F5"
            textColor="#000"
            name="receiptDefault"
            control={control}
            options={accounts}
            optionValueType="id"
            defaultValue={accounts[0].id}
          />

          <Select
            label="Categoria"
            backgroundColor="#D4E3F5"
            textColor="#000"
            name="category"
            control={control}
            options={IncomeCategories}
            defaultValue={IncomeCategories[0].name}
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
            {!!incomeId && (
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
      >
        <S.ModalContent>
          <FiAlertCircle color={okButtonColor} size={34} />
          <strong>Tem certeza que deseja excluir essa conta?</strong>

          <S.ButtonRowContainer>
            <S.Button
              background={cancelButtonColor}
              color="#fff"
              onClick={() => setDeleteConfirmationVisible(false)}
            >
              Cancelar
            </S.Button>
            <S.Button
              background={okButtonColor}
              color="#fff"
              onClick={handleDelete}
            >
              Sim
            </S.Button>
          </S.ButtonRowContainer>
        </S.ModalContent>
      </Modal>
    </>
  );
}
