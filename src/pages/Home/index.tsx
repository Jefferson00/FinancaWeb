import Header from "../../components/Header";
import MainSide from "../../components/MainSide";
import MenuItem from "../../components/MenuItem";

import {
  MdArrowUpward,
  MdArrowDownward,
  MdCreditCard,
  MdHome,
} from "react-icons/md";

import * as S from "./styles";

import HomeContent from "../../components/HomeContent";
import IncomeView from "../../components/IncomeView";
import ExpansesView from "../../components/ExpansesView";
import CardsView from "../../components/CardsView";

const Home = () => {
  const menu = {
    item: "Home",
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
            selected={menu.item === "Home"}
            onClick={() => null}
          />
          <MenuItem
            onClick={() => null}
            icon={MdArrowUpward}
            selected={menu.item === "Entradas"}
            title="Entradas"
          />
          <MenuItem
            icon={MdArrowDownward}
            title="Despesas"
            selected={menu.item === "Despesas"}
            onClick={() => null}
          />
          <MenuItem
            icon={MdCreditCard}
            title="Cartões"
            selected={menu.item === "Cartões"}
            onClick={() => null}
          />
        </S.MenuList>

        <S.Content>
          {menu.item === "Home" && <HomeContent />}

          {menu.item === "Entradas" && <IncomeView />}

          {menu.item === "Despesas" && <ExpansesView />}

          {menu.item === "Cartões" && <CardsView />}
        </S.Content>
      </S.Container>
    </div>
  );
};

export default Home;
