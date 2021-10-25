import React, { useState } from 'react';
import Header from '../../components/Header';
import MainSide from '../../components/MainSide';
import MenuItem from '../../components/MenuItem';

import { MdArrowUpward, MdArrowDownward, MdCreditCard, MdSecurity } from 'react-icons/md';

import * as S from './styles';
import Estimates from '../../components/EstimatesView';

export default function Home() {
  const [itemSelected, setItemSelected] = useState('');

  return (
    <div>
      <Header />
      <S.Container>
        <S.Aside>
          <MainSide />
        </S.Aside>
        <S.MenuList>
          <MenuItem
            onClick={() => setItemSelected('Entradas')}
            icon={MdArrowUpward}
            selected={itemSelected === 'Entradas'}
            title="Entradas"
          />
          <MenuItem
            icon={MdArrowDownward}
            title="Despesas"
            selected={itemSelected === 'Despesas'}
            onClick={() => setItemSelected('Despesas')}
          />
          <MenuItem
            icon={MdCreditCard}
            title="Cartões"
            selected={itemSelected === 'Cartões'}
            onClick={() => setItemSelected('Cartões')}
          />
          <MenuItem
            icon={MdSecurity}
            title="Segurança"
            selected={itemSelected === 'Segurança'}
            onClick={() => setItemSelected('Segurança')}
          />
        </S.MenuList>

        <S.Content>
          <Estimates />
        </S.Content>
      </S.Container>
    </div>
  )
}