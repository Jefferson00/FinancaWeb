import { Control, SubmitHandler, UseFormHandleSubmit } from "react-hook-form";
import Button from "../../utils/Button";
import Input from "../../utils/Input";
import Select from "../../utils/Select";
import Switch from "react-switch";
import * as S from "./styles";
import { Colors } from "../../../styles/global";
import State, { ICreateIncome, IUpdateIncome } from "../../../store/interfaces";
import {
  currencyMask,
  currencyToValue,
} from "../../../utils/getCurrencyFormat";
import { useDispatch, useSelector } from "react-redux";
import { FaCheck, FaSave } from "react-icons/fa";
import { IncomeCategories } from "../../../utils/types";
import { useEffect, useState } from "react";
import SelectButton from "../../utils/SelectButton";
import { addMonths, format, isSameMonth, parse } from "date-fns";
import DatePicker from "../../utils/DatePicker";
import {
  createIncome,
  updateIncome,
} from "../../../store/modules/Incomes/fetchActions";
import { IncomeFormData } from "../../../utils/formDatas";

interface CreateIncomeProps {
  control: Control<IncomeFormData>;
  handleSubmit: UseFormHandleSubmit<IncomeFormData>;
  incomeId?: string;
  onFinish: () => void;
  recurrence: "Mensal" | "Parcelada";
}

export default function CreateIncome({
  control,
  incomeId,
  recurrence,
  onFinish,
  handleSubmit,
}: CreateIncomeProps) {
  const dispatch = useDispatch<any>();
  const { user } = useSelector((state: State) => state.auth);
  const { selectedMonth } = useSelector((state: State) => state.dates);
  const { accounts } = useSelector((state: State) => state.accounts);

  const [recurrenceState, setRecurrenceState] = useState<
    "Mensal" | "Parcelada"
  >(recurrence);
  const [received, setReceived] = useState(false);

  const firstBackgroundColor = Colors.GREEN_PRIMARY_LIGHTER;
  const secondBackgroundColor = Colors.GREEN_SECONDARY_LIGHTER;

  const onSubmit: SubmitHandler<IncomeFormData> = (data) => {
    const interationVerified =
      data.iteration === "0" ? 1 : Number(data.iteration);
    const startDateParsed = parse(data.startDate, "yyyy-MM-dd", new Date());
    if (!!incomeId) {
      const incomeToUpdate: IUpdateIncome = {
        ...data,
        userId: user.id,
        value:
          data.value && data.value.startsWith("R$")
            ? Number(currencyToValue(data.value))
            : Number(data.value),
        iteration:
          recurrenceState === "Parcelada"
            ? String(interationVerified)
            : "Mensal",
        receiptDate: startDateParsed,
        startDate: startDateParsed,
        endDate:
          recurrenceState === "Parcelada"
            ? addMonths(startDateParsed, interationVerified - 1)
            : null,
      };
      dispatch(updateIncome(incomeToUpdate, incomeId));
      onFinish();
      return;
    }
    const incomeToCreate: ICreateIncome = {
      ...data,
      userId: user.id,
      value:
        data.value && data.value !== "0"
          ? Number(currencyToValue(data.value))
          : 0,
      iteration:
        recurrenceState === "Parcelada" ? String(interationVerified) : "Mensal",
      receiptDate: startDateParsed,
      startDate: startDateParsed,
      endDate:
        recurrenceState === "Parcelada"
          ? addMonths(startDateParsed, interationVerified - 1)
          : null,
    };
    dispatch(createIncome(incomeToCreate));
    onFinish();
  };

  useEffect(() => {
    setRecurrenceState(recurrence);
  }, [recurrence]);

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
                checked={recurrenceState === "Mensal"}
                onClick={() => setRecurrenceState("Mensal")}
              />
              <SelectButton
                type="button"
                backgroundColor="#E2EDF0"
                color="#262626"
                icon={() => <FaCheck color="#FFF" size={25} />}
                title="Parcelada"
                checked={recurrenceState === "Parcelada"}
                onClick={() => setRecurrenceState("Parcelada")}
              />
              <Input
                backgroundColor="#D4E3F5"
                textColor="#000"
                name="iteration"
                maxLength={2}
                defaultValue={1}
                disabled={recurrenceState === "Mensal"}
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
          </S.ButtonContainer>
        </form>
      </S.Container>
    </>
  );
}
