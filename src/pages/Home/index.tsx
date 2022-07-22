import Header from "../../components/app/Header";
import MainSide from "../../components/app/MainSide";
import MenuItem from "../../components/utils/MenuItem";

import {
  MdArrowUpward,
  MdArrowDownward,
  MdCreditCard,
  MdHome,
} from "react-icons/md";

import * as S from "./styles";

import HomeContent from "../../components/app/HomeContent";
import IncomeView from "../../components/app/IncomeView";
import ExpansesView from "../../components/app/ExpansesView";
import CardsView from "../../components/app/CardsView";
import { useDispatch, useSelector } from "react-redux";
import { changeMenu } from "../../store/modules/Menus";
import State from "../../store/interfaces";
import { addMessage } from "../../store/modules/Feedbacks";
import EnvironmentMessage from "../../components/app/EnvironmentMessage";

const Home = () => {
  const dispatch = useDispatch<any>();
  const menu = useSelector((state: State) => state.menus);
  const { accounts, loading: loadingAccounts } = useSelector(
    (state: State) => state.accounts
  );
  const { loading: loadingIncomes } = useSelector(
    (state: State) => state.incomes
  );
  const { loading: loadingExpanses } = useSelector(
    (state: State) => state.expanses
  );
  const { loading: loadingCreditCards } = useSelector(
    (state: State) => state.creditCards
  );

  const noAccountFound = () => {
    return !loadingAccounts && accounts.length === 0;
  };

  const handleChangeMenu = (menu: string) => {
    if (noAccountFound()) {
      dispatch(
        addMessage({
          type: "warning",
          message:
            "Você precisa cadastrar uma conta para poder usar essa funcionalidade",
        })
      );
      return;
    }
    dispatch(changeMenu(menu));
  };

  return (
    <div>
      <Header />
      <S.Container>
        <S.Aside>
          <MainSide />
        </S.Aside>
        <S.MenuList>
          <MenuItem
            icon={MdHome}
            title="Inicio"
            selected={menu === "Home"}
            onClick={() => handleChangeMenu("Home")}
          />
          <MenuItem
            onClick={() => handleChangeMenu("Entradas")}
            icon={MdArrowUpward}
            selected={menu === "Entradas"}
            title="Entradas"
            disabled={loadingAccounts || loadingIncomes}
          />
          <MenuItem
            icon={MdArrowDownward}
            title="Despesas"
            selected={menu === "Despesas"}
            onClick={() => handleChangeMenu("Despesas")}
            disabled={loadingAccounts || loadingExpanses}
          />
          <MenuItem
            icon={MdCreditCard}
            title="Cartões"
            selected={menu === "Cartões"}
            onClick={() => handleChangeMenu("Cartões")}
            disabled={loadingAccounts || loadingExpanses || loadingCreditCards}
          />
        </S.MenuList>

        <S.Content reverse={menu === "Entradas" || menu === "Despesas"}>
          {menu === "Home" && <HomeContent />}

          {menu === "Entradas" && <IncomeView />}

          {menu === "Despesas" && <ExpansesView />}

          {menu === "Cartões" && <CardsView />}
        </S.Content>
      </S.Container>
      {process.env.REACT_APP_ENV !== "production" && <EnvironmentMessage />}
    </div>
  );
};

export default Home;
