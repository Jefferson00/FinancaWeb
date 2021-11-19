import React, { useState } from 'react';
import Header from '../../components/Header';
import MainSide from '../../components/MainSide';
import MenuItem from '../../components/MenuItem';

import { MdArrowUpward, MdArrowDownward, MdCreditCard, MdSecurity } from 'react-icons/md';

import * as S from './styles';
import Estimates from '../../components/EstimatesView';
import Transactions from '../../components/Transactions';
import RemindView from '../../components/RemindView';

interface RemindItemProps {
  day: Date;
  items: {
    id: string;
    category: string;
    name: string;
    value: number;
    date: Date;
    type: 'EXPANSE' | 'INCOME';
    received: boolean;
  }[]
}

export default function Home() {
  const [itemSelected, setItemSelected] = useState('');

  const lateItems: RemindItemProps[] = [
    {
      day: new Date(),
      items: [
        {
          id: 'f015df05d',
          category: 'Casa',
          name: 'Conta de coisa',
          value: 58590,
          date: new Date(),
          type: 'EXPANSE',
          received: false,
        },
      ]
    }
  ]

  const nextDaysItems: RemindItemProps[] = [
    {
      day: new Date(),
      items: [
        {
          id: 'f015df05d',
          category: 'Casa',
          name: 'Conta de coisa',
          value: 58590,
          date: new Date(),
          type: 'EXPANSE',
          received: false,
        },
      ]
    },
    {
      day: new Date(),
      items: [
        {
          id: 'f015df05d',
          category: 'Casa',
          name: 'Conta de coisa',
          value: 58590,
          date: new Date(),
          type: 'INCOME',
          received: false,
        },
        {
          id: 'f015df05d',
          category: 'Casa',
          name: 'Conta de coisa',
          value: 58590,
          date: new Date(),
          type: 'EXPANSE',
          received: false,
        },
      ]
    }
  ]

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

          <Transactions />

          <RemindView type="LATE" items={lateItems} />

          <RemindView type="NEXTDAYS" items={nextDaysItems} />
        </S.Content>
      </S.Container>
    </div>
  )
}