import { Control, SubmitHandler, UseFormHandleSubmit } from "react-hook-form";
import Button from "../../utils/Button";
import Input from "../../utils/Input";
import Select from "../../utils/Select";
import * as S from "./styles";
import {
  BLUE_PRIMARY,
  BLUE_SECONDARY,
  MAIN_TEXT,
  RED_SOFT,
  sizes,
} from "../../../styles/global";
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
import { useMedia } from "../../../utils/media";

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
  const mobileL = useMedia(`(max-width: ${sizes.mobileL})`);
  const { user } = useSelector((state: State) => state.auth);
  const { accounts } = useSelector((state: State) => state.accounts);

  const [openDropDown, setOpenDropDown] = useState(false);
  const [colorState, setColorState] = useState(ColorsList[0].color);

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
            backgroundColor={RED_SOFT}
            textColor={MAIN_TEXT}
            name="name"
            defaultValue={""}
            control={control}
          />

          {mobileL ? (
            <>
              <Input
                label="Limite"
                backgroundColor={RED_SOFT}
                textColor={MAIN_TEXT}
                name="limit"
                mask={currencyMask}
                defaultValue={"0"}
                control={control}
              />

              <S.Col>
                <S.Label color="#000">Cor</S.Label>
                <SelectButton
                  type="button"
                  backgroundColor={RED_SOFT}
                  textColor={MAIN_TEXT}
                  icon={() => <MdColorLens size={25} />}
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

              <DatePicker
                label="Data de pagamento"
                backgroundColor={RED_SOFT}
                textColor={MAIN_TEXT}
                name="paymentDate"
                defaultValue={format(new Date(), "yyyy-MM-dd")}
                control={control}
              />

              <DatePicker
                label="Fechamento da fatura"
                backgroundColor={RED_SOFT}
                textColor={MAIN_TEXT}
                name="invoiceClosing"
                defaultValue={format(new Date(), "yyyy-MM-dd")}
                control={control}
              />
            </>
          ) : (
            <>
              <S.Row>
                <S.Col>
                  <Input
                    label="Limite"
                    backgroundColor={RED_SOFT}
                    textColor={MAIN_TEXT}
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
                    backgroundColor={RED_SOFT}
                    textColor={MAIN_TEXT}
                    icon={() => <MdColorLens size={25} />}
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
                    backgroundColor={RED_SOFT}
                    textColor={MAIN_TEXT}
                    name="paymentDate"
                    defaultValue={format(new Date(), "yyyy-MM-dd")}
                    control={control}
                  />
                </S.Col>

                <S.Col>
                  <DatePicker
                    label="Fechamento da fatura"
                    backgroundColor={RED_SOFT}
                    textColor={MAIN_TEXT}
                    name="invoiceClosing"
                    defaultValue={format(new Date(), "yyyy-MM-dd")}
                    control={control}
                  />
                </S.Col>
              </S.Row>
            </>
          )}

          <Select
            label="Conta de recebimento"
            backgroundColor={RED_SOFT}
            textColor={MAIN_TEXT}
            name="receiptDefault"
            control={control}
            options={accounts}
            optionValueType="id"
            defaultValue={accounts[0]?.id}
          />

          <S.ButtonContainer>
            <Button
              title="Salvar"
              colors={{
                PRIMARY_BACKGROUND: BLUE_PRIMARY,
                SECOND_BACKGROUND: BLUE_SECONDARY,
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
