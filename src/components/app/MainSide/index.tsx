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
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import State, { IAccount } from "../../../store/interfaces";
import { listAccounts } from "../../../store/modules/Accounts/fetchActions";
import Modal from "../../utils/Modal";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import CreateAccount from "../CreateAccount";
import { accountTypes } from "../../../utils/types";
import { changeMonth } from "../../../store/modules/Dates";
import {
  listExpanses,
  listExpansesOnAccount,
} from "../../../store/modules/Expanses/fetchActions";
import {
  listIncomes,
  listIncomesOnAccount,
} from "../../../store/modules/Incomes/fetchActions";
import { isSameMonth } from "date-fns";
import { getAccountEstimateBalance } from "../../../utils/getAccountBalance";
import { getCurrencyFormat } from "../../../utils/getCurrencyFormat";
import { getItemsInThisMonth } from "../../../utils/listByDate";
import { listCreditCards } from "../../../store/modules/CreditCards/fetchActions";

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

const MainSide = () => {
  const dispatch = useDispatch<any>();
  const { user } = useSelector((state: State) => state.auth);
  const { accounts, loading } = useSelector((state: State) => state.accounts);
  const { incomes } = useSelector((state: State) => state.incomes);
  const { expanses } = useSelector((state: State) => state.expanses);
  const { selectedMonth } = useSelector((state: State) => state.dates);

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
  const [totalEstimateBalance, setTotalEstimateBalance] = useState(0);
  const [totalCurrentBalance, setTotalCurrentBalance] = useState(0);
  const [totalIncomesBalance, setTotalIncomesBalance] = useState(0);
  const [totalExpansesBalance, setTotalExpansesBalance] = useState(0);
  const [balances, setBalances] = useState<
    { accountId: string; currentBalance: number; estimateBalance: number }[]
  >([]);

  useEffect(() => {
    const censoredStatusStoraged = localStorage.getItem(
      "financaWeb.censored.mainside"
    );

    setCensored(censoredStatusStoraged === "true" ? true : false);
  }, []);

  useEffect(() => {
    if (user.id) {
      dispatch(listAccounts(user.id));
      dispatch(listExpanses(user.id));
      dispatch(listExpansesOnAccount(user.id));
      dispatch(listIncomes(user.id));
      dispatch(listIncomesOnAccount(user.id));
      dispatch(listCreditCards(user.id));
    }
  }, [dispatch, user]);

  const handleToggleCensored = () => {
    setCensored(!censored);

    localStorage.setItem("financaWeb.censored.mainside", String(!censored));
  };

  const { control, handleSubmit, setValue } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const handleEditAccountOpenModal = () => {
    setModalVisibility(true);
    setValue("name", accounts[accountSelected].name);
    setValue("type", accounts[accountSelected].type);
    setValue("initialValue", accounts[accountSelected].initialValue.toString());
    setAccountState(accounts[accountSelected]);
  };

  const handleCloseAccountModal = () => {
    setModalVisibility(false);
    setValue("name", "");
    setValue("type", accountTypes[0].name);
    setValue("initialValue", "0");
    setAccountState(null);
    setAccountSelected(0);
  };

  const handleChangeMonth = (order: "PREV" | "NEXT") => {
    const currentMonth = selectedMonth.getMonth();
    const newDate = new Date(
      selectedMonth.setMonth(
        order === "NEXT" ? currentMonth + 1 : currentMonth - 1
      )
    );
    dispatch(changeMonth(newDate.toISOString()));
  };

  useEffect(() => {
    let sumTotalCurrentBalance = 0;
    let sumTotalEstimateBalance = 0;
    const accountsBalances: {
      accountId: string;
      currentBalance: number;
      estimateBalance: number;
    }[] = [];
    const isTheSameMonth = isSameMonth(new Date(), selectedMonth);

    // eslint-disable-next-line array-callback-return
    accounts.map((account) => {
      const currentBalance = account.balance;

      const lastMonthEstimateBalance = localStorage.getItem(
        `@FinancaAppBeta:LastMonthEstimateBalance@${account.id}`
      );

      const estimateBalance = isTheSameMonth
        ? getAccountEstimateBalance(
            account,
            currentBalance,
            incomes,
            expanses,
            selectedMonth
          )
        : getAccountEstimateBalance(
            account,
            Number(lastMonthEstimateBalance),
            incomes,
            expanses,
            selectedMonth
          );

      const currentMonthEstimateBalance = localStorage.getItem(
        `@FinancaAppBeta:CurrentMonthEstimateBalance@${account.id}@${selectedMonth}`
      );

      if (!currentMonthEstimateBalance) {
        localStorage.setItem(
          `@FinancaAppBeta:CurrentMonthEstimateBalance@${account.id}@${selectedMonth}`,
          String(estimateBalance)
        );
      }

      sumTotalCurrentBalance = sumTotalCurrentBalance + currentBalance;
      sumTotalEstimateBalance =
        isTheSameMonth || !currentMonthEstimateBalance
          ? sumTotalEstimateBalance + estimateBalance
          : sumTotalEstimateBalance + Number(currentMonthEstimateBalance);

      accountsBalances.push({
        accountId: account.id,
        currentBalance: currentBalance,
        estimateBalance:
          isTheSameMonth || !currentMonthEstimateBalance
            ? estimateBalance
            : Number(currentMonthEstimateBalance),
      });
    });

    setTotalCurrentBalance(sumTotalCurrentBalance);
    setTotalEstimateBalance(sumTotalEstimateBalance);
    setBalances(accountsBalances);
  }, [accounts, expanses, incomes, selectedMonth]);

  useEffect(() => {
    const currentIncomes = getItemsInThisMonth(incomes, selectedMonth);
    const totalcurrentIncomes = currentIncomes.reduce(
      (a, b) => a + (b["value"] || 0),
      0
    );

    const currentExpanses = getItemsInThisMonth(expanses, selectedMonth);
    const totalcurrentExpanses = currentExpanses.reduce(
      (a, b) => a + (b["value"] || 0),
      0
    );

    setTotalIncomesBalance(totalcurrentIncomes);
    setTotalExpansesBalance(totalcurrentExpanses);
  }, [expanses, incomes, selectedMonth]);

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
            <S.Prev onClick={() => handleChangeMonth("PREV")}>
              <FaChevronLeft color="#fff" />
            </S.Prev>
            <S.Month>{getMounthAndYear(selectedMonth)}</S.Month>
            <S.Next onClick={() => handleChangeMonth("NEXT")}>
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
                <S.Value color={textColor}>
                  {getCurrencyFormat(totalCurrentBalance)}
                </S.Value>
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
                  {getCurrencyFormat(totalEstimateBalance)}
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
                <S.Value color={incomeColor}>
                  {getCurrencyFormat(totalIncomesBalance)}
                </S.Value>
              )}
            </S.Balance>
            <S.Balance>
              <S.Title color={expenseColor}>Despesas</S.Title>
              {censored ? (
                <S.Value color={expenseColor}>***********</S.Value>
              ) : (
                <S.Value color={expenseColor}>
                  {getCurrencyFormat(totalExpansesBalance)}
                </S.Value>
              )}
            </S.Balance>
          </S.Row>
        </S.Balances>

        <S.AccountContainer>
          <h4>Contas</h4>

          <S.AccountCardList onClick={handleEditAccountOpenModal}>
            {loading && <p>Carregando...</p>}
            {accounts.length > 0 && (
              <Card
                account={accounts[accountSelected]}
                balances={balances[accountSelected]}
                censored={censored}
              />
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

      <Modal visible={modalVisibility} onCancel={handleCloseAccountModal}>
        <CreateAccount
          accountId={accountState?.id}
          control={control}
          handleSubmit={handleSubmit}
          onFinish={handleCloseAccountModal}
        />
      </Modal>
    </>
  );
};

export default MainSide;
