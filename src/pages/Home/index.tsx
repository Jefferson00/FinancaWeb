import Header from '../../components/Header';
import MainSide from '../../components/MainSide';
import MenuItem from '../../components/MenuItem';
import { observer } from 'mobx-react-lite';

import { MdArrowUpward, MdArrowDownward, MdCreditCard, MdHome } from 'react-icons/md';

import * as S from './styles';

import { useStores } from '../../store';
import HomeContent from '../../components/HomeContent';

const Home = observer(() => {
  const { menuStore } = useStores();
  const { selectItem, menu } = menuStore;

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
            selected={menu.item === 'Home'}
            onClick={() => selectItem('Home')}
          />
          <MenuItem
            onClick={() => selectItem('Entradas')}
            icon={MdArrowUpward}
            selected={menu.item === 'Entradas'}
            title="Entradas"
          />
          <MenuItem
            icon={MdArrowDownward}
            title="Despesas"
            selected={menu.item === 'Despesas'}
            onClick={() => selectItem('Despesas')}
          />
          <MenuItem
            icon={MdCreditCard}
            title="Cartões"
            selected={menu.item === 'Cartões'}
            onClick={() => selectItem('Cartões')}
          />

        </S.MenuList>

        <S.Content>
          {menu.item === 'Home' && <HomeContent />}
        </S.Content>
      </S.Container>
    </div>
  )
});

export default Home