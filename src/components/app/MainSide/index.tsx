import { useState, useEffect } from "react";
import { Colors } from "../../../styles/global";
import * as S from "./styles";
import Card from "../AccountCard";
import Button from "../../utils/Button";
import { getMounthAndYear } from "../../../utils/dateFormats";
import {
  FaChevronLeft,
  FaChevronRight,
  FaEye,
  FaEyeSlash,
  FaPlus,
  FaSave,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import State, { IAccount, ICreateAccount } from "../../../store/interfaces";
import {
  createAccount,
  listAccounts,
} from "../../../store/modules/Accounts/fetchActions";
import Modal from "../../utils/Modal";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import {
  currencyMask,
  currencyToValue,
} from "../../../utils/getCurrencyFormat";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../utils/Input";
import Select from "../../utils/Select";

const schema = yup.object({
  name: yup
    .string()
    .required("Campo obrigátorio")
    .min(2, "deve ter no mínimo 2 caracteres")
    .max(25, "deve ter no máximo 25 caracteres"),
  type: yup.string().required("Campo obrigátorio"),
});

type FormData = {
  name: string;
  type: string;
  status: string;
  initialValue?: string;
};

export const accountTypes = [
  {
    id: 1,
    name: "Conta Corrente",
  },
  {
    id: 2,
    name: "Conta Poupança",
  },
  {
    id: 3,
    name: "Carteira",
  },
  {
    id: 4,
    name: "Outro",
  },
];

const types = [
  {
    icon: "🏢",
    name: "Conta Corrente",
  },
  {
    icon: "💰",
    name: "Conta Poupança",
  },
  {
    icon: "💵",
    name: "Carteira",
  },
  {
    icon: "🪙",
    name: "Outro",
  },
];

const MainSide = () => {
  const dispatch = useDispatch<any>();
  const { user } = useSelector((state: State) => state.auth);
  const accounts = useSelector((state: State) => state.accounts);

  const firstBackgroundColor = Colors.ORANGE_PRIMARY_LIGHTER;
  const secondBackgroundColor = Colors.ORANGE_SECONDARY_LIGHTER;
  const titleColor = Colors.BLUE_PRIMARY_LIGHTER;
  const textColor = Colors.MAIN_TEXT_LIGHTER;
  const expenseColor = Colors.RED_PRIMARY_LIGHTER;
  const incomeColor = Colors.GREEN_PRIMARY_LIGHTER;

  const [accountSelected, setAccountSelected] = useState(0);
  const [censored, setCensored] = useState(false);

  const [accountState, setAccountState] = useState<IAccount | null>(null);
  const [modalVisibility, setModalVisibility] = useState(false);

  useEffect(() => {
    const censoredStatusStoraged = localStorage.getItem(
      "financaWeb.censored.mainside"
    );

    setCensored(censoredStatusStoraged === "true" ? true : false);
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(listAccounts(user.id));
    }
  }, [dispatch, user]);

  const handleToggleCensored = () => {
    setCensored(!censored);

    localStorage.setItem("financaWeb.censored.mainside", String(!censored));
  };

  const { control, handleSubmit, setValue } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const accountToCreate: ICreateAccount = {
      ...data,
      status: "active",
      initialValue: Number(currencyToValue(data.initialValue || "0")),
      userId: user.id,
    };
    console.log(accountToCreate);
    // dispatch(createAccount(accountToCreate));
    setModalVisibility(false);
  };

  return (
    <>
      <S.Container
        linearGradient={{
          first: firstBackgroundColor,
          second: secondBackgroundColor,
        }}
      >
        <S.Header>
          <S.MonthSelector>
            <S.Prev>
              <FaChevronLeft color="#fff" />
            </S.Prev>
            <S.Month>{getMounthAndYear(new Date())}</S.Month>
            <S.Next>
              <FaChevronRight color="#fff" />
            </S.Next>
          </S.MonthSelector>

          <S.ViewButton onClick={handleToggleCensored}>
            {censored ? (
              <FaEye color="#fff" size={26} />
            ) : (
              <FaEyeSlash color="#fff" size={26} />
            )}
          </S.ViewButton>
        </S.Header>

        <S.Balances>
          <S.Row>
            <S.Balance>
              <S.Title color={titleColor}>Saldo atual</S.Title>
              {censored ? (
                <S.Value color={textColor}>***********</S.Value>
              ) : (
                <S.Value color={textColor}>R$ 15.000,00</S.Value>
              )}
            </S.Balance>
            <S.Balance>
              <S.Title color={titleColor} opacity={0.5}>
                Saldo previsto
              </S.Title>
              {censored ? (
                <S.Value color={textColor} opacity={0.5}>
                  ***********
                </S.Value>
              ) : (
                <S.Value color={textColor} opacity={0.5}>
                  R$ 14.300,00
                </S.Value>
              )}
            </S.Balance>
          </S.Row>

          <S.Row>
            <S.Balance>
              <S.Title color={incomeColor}>Receitas</S.Title>
              {censored ? (
                <S.Value color={incomeColor}>***********</S.Value>
              ) : (
                <S.Value color={incomeColor}>R$ 15.000,00</S.Value>
              )}
            </S.Balance>
            <S.Balance>
              <S.Title color={expenseColor}>Despesas</S.Title>
              {censored ? (
                <S.Value color={expenseColor}>***********</S.Value>
              ) : (
                <S.Value color={expenseColor}>R$ 14.300,00</S.Value>
              )}
            </S.Balance>
          </S.Row>
        </S.Balances>

        <S.AccountContainer>
          <h4>Contas</h4>

          <S.AccountCardList
            onClick={() => {
              setModalVisibility(true);
              setValue("name", accounts[accountSelected].name);
              setAccountState(accounts[accountSelected]);
            }}
          >
            {accounts.length > 0 && (
              <Card account={accounts[accountSelected]} censored={censored} />
            )}
          </S.AccountCardList>

          <S.CardDots>
            {accounts.map((account, index) => (
              <S.Dot
                key={index}
                selected={accountSelected === index}
                onClick={() => {
                  setAccountSelected(index);
                }}
              />
            ))}
          </S.CardDots>
        </S.AccountContainer>

        <S.ButtonContainer>
          <Button
            title="Criar nova conta"
            icon={() => <FaPlus color="#FFF" size={25} />}
            colors={{
              PRIMARY_BACKGROUND: "#FFF",
              SECOND_BACKGROUND: "#2673CE",
              TEXT: "#2673CE",
            }}
            onClick={() => setModalVisibility(true)}
          />
        </S.ButtonContainer>
      </S.Container>

      <Modal
        visible={modalVisibility}
        onCancel={() => setModalVisibility(false)}
      >
        <p>{accountState?.name}</p>
        <S.AccountForm>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Nome"
              backgroundColor="#D4E3F5"
              textColor="#000"
              name="name"
              defaultValue={accountState?.name || ""}
              control={control}
            />

            <Select
              label="Tipo de conta"
              backgroundColor="#D4E3F5"
              textColor="#000"
              name="type"
              control={control}
              options={types}
              defaultValue={types[0].name}
            />

            <Input
              label="Saldo Inicial"
              backgroundColor="#D4E3F5"
              textColor="#000"
              name="initialValue"
              mask={currencyMask}
              defaultValue={String(accountState?.initial_value) || "0"}
              control={control}
            />

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
          </form>
        </S.AccountForm>
      </Modal>
    </>
  );
};

export default MainSide;
