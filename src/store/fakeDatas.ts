import { IAccount } from "./interfaces";

export const accounts: IAccount[] = [
  {
    name: 'Banco do Brasil',
    type: 'Corrente',
    balance: 100000,
  },
  {
    name: 'Nubank',
    type: 'Corrente',
    balance: 1000000,
  },
  {
    name: 'Carteira',
    type: 'Carteira',
    balance: 200000,
  },
]

export const incomes = [
  {
    id: 'Assd4515fs1f5vw58e',
    name: 'Recebimento 1',
    value: 100000,
    category: 'Outro',
    receivement_day: 20,
    frequency: '3',
    created_at: '2021-10-25 20:53:46'
  },
  {
    id: 'Assd4sdgdfjdtjtw58e',
    name: 'Dinheiro',
    value: 50000,
    category: 'Outro',
    receivement_day: 20,
    frequency: '1',
    created_at: '2021-10-25 20:53:46'
  }
]