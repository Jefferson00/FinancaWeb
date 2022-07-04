import { Control, SubmitHandler, UseFormHandleSubmit } from "react-hook-form";
import Button from "../../utils/Button";
import Input from "../../utils/Input";
import Select from "../../utils/Select";
import * as S from "./styles";
import { Colors } from "../../../styles/global";
import State, {
  ICreateCreditCard,
  IUpdateCreditCard,
} from "../../../store/interfaces";
import {
  currencyMask,
  currencyToValue,
} from "../../../utils/getCurrencyFormat";
import { useDispatch, useSelector } from "react-redux";
import { FaSave } from "react-icons/fa";
import { ColorsList } from "../../../utils/types";
import { useEffect, useState } from "react";
import { CardFormData } from "../../../utils/formDatas";
import DatePicker from "../../utils/DatePicker";
import { format, parse } from "date-fns";
import SelectButton from "../../utils/SelectButton";
import { MdColorLens } from "react-icons/md";
import {
  createCreditCard,
  updateCreditCard,
} from "../../../store/modules/CreditCards/fetchActions";

interface CreateCreditCardProps {
  control: Control<CardFormData>;
  handleSubmit: UseFormHandleSubmit<CardFormData>;
  creditCardId?: string;
  creditCardColor?: string;
  onFinish: () => void;
}

export default function CreateCreditCard({
  control,
  creditCardId,
  creditCardColor,
  handleSubmit,
  onFinish,
}: CreateCreditCardProps) {
  const dispatch = useDispatch<any>();
  const { user } = useSelector((state: State) => state.auth);
  const { accounts } = useSelector((state: State) => state.accounts);

  const [openDropDown, setOpenDropDown] = useState(false);
  const [colorState, setColorState] = useState(ColorsList[0].color);

  const firstBackgroundColor = Colors.BLUE_PRIMARY_LIGHTER;
  const secondBackgroundColor = Colors.BLUE_SECONDARY_LIGHTER;

  const onSubmit: SubmitHandler<CardFormData> = (data) => {
    if (!!creditCardId) {
      const cardToUpdate: IUpdateCreditCard = {
        ...data,
        paymentDate: parse(data.paymentDate, "yyyy-MM-dd", new Date()),
        invoiceClosing: parse(data.invoiceClosing, "yyyy-MM-dd", new Date()),
        limit:
          data.limit && data.limit.startsWith("R$")
            ? Number(currencyToValue(data.limit))
            : Number(data.limit),
        userId: user.id,
        color: colorState,
      };
      dispatch(updateCreditCard(cardToUpdate, creditCardId));
      onFinish();
      return;
    }
    const cardToCreate: ICreateCreditCard = {
      ...data,
      paymentDate: parse(data.paymentDate, "yyyy-MM-dd", new Date()),
      invoiceClosing: parse(data.invoiceClosing, "yyyy-MM-dd", new Date()),
      limit:
        data.limit && data.limit !== "0"
          ? Number(currencyToValue(data.limit))
          : 0,
      userId: user.id,
      color: colorState,
    };
    dispatch(createCreditCard(cardToCreate));
    onFinish();
  };

  useEffect(() => {
    if (creditCardColor) setColorState(creditCardColor);
  }, [creditCardColor]);

  return (
    <>
      <S.Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Nome"
            backgroundColor="#E9DEDF"
            textColor="#000"
            name="name"
            defaultValue={""}
            control={control}
          />

          <S.Row>
            <S.Col>
              <Input
                label="Limite"
                backgroundColor="#E9DEDF"
                textColor="#000"
                name="limit"
                mask={currencyMask}
                defaultValue={"0"}
                control={control}
              />
            </S.Col>

            <S.Col>
              <S.Label color="#000">Cor</S.Label>
              <SelectButton
                type="button"
                backgroundColor="#E9DEDF"
                color="#262626"
                icon={() => <MdColorLens color="#2c2c2c" size={25} />}
                title="Cor"
                onClick={() => setOpenDropDown((prevState) => !prevState)}
                openDropDown={openDropDown}
                dropDownContent={
                  <S.ListColors>
                    {ColorsList.map((color) => (
                      <button
                        type="button"
                        key={color.id}
                        onClick={() => setColorState(color.color)}
                      >
                        <S.Dot color={color.color} />
                      </button>
                    ))}
                  </S.ListColors>
                }
              >
                <S.Dot color={colorState} />
              </SelectButton>
            </S.Col>
          </S.Row>

          <S.Row>
            <S.Col>
              <DatePicker
                label="Data de pagamento"
                backgroundColor="#E9DEDF"
                textColor="#000"
                name="paymentDate"
                defaultValue={format(new Date(), "yyyy-MM-dd")}
                control={control}
              />
            </S.Col>

            <S.Col>
              <DatePicker
                label="Fechamento da fatura"
                backgroundColor="#E9DEDF"
                textColor="#000"
                name="invoiceClosing"
                defaultValue={format(new Date(), "yyyy-MM-dd")}
                control={control}
              />
            </S.Col>
          </S.Row>

          <Select
            label="Conta de recebimento"
            backgroundColor="#E9DEDF"
            textColor="#000"
            name="receiptDefault"
            control={control}
            options={accounts}
            optionValueType="id"
            defaultValue={accounts[0].id}
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