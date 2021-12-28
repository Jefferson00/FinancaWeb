import { IAccount } from "./interfaces";


export const accounts: IAccount[] = [
  {
    name: 'Banco do Brasil',
    type: 'Corrente',
    created_at: '2021-12-07 00:16:08',
    initial_value: 100000,
    status: 'Active',
    id: '000001',
  },
  {
    name: 'Nubank',
    type: 'Corrente',
    created_at: '2021-12-07 00:16:08',
    initial_value: 100000,
    status: 'Active',
    id: '000002',
  },
  {
    name: 'Carteira',
    type: 'Carteira',
    created_at: '2021-12-07 00:16:08',
    initial_value: 100000,
    status: 'Active',
    id: '000003',
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

export const incomesAccount = [
  {
    id: 'kjdfsj7df8s7f9s',
    account_id: '000001',
    income_id: 'Assd4515fs1f5vw58e',
    month: '2021-12-25 20:53:46',
    recurrence: '1/3',
    value: 100000,
  },
  {
    id: 'gdfhkj0379ghf',
    account_id: '000001',
    income_id: 'Assd4sdgdfjdtjtw58e',
    month: '2021-12-25 20:53:46',
    recurrence: '1',
    value: 50000,
  },
]


export const expansesAccount = [
  {
    id: 'hdfhtjrkjrtkrt',
    account_id: '000001',
    expanse_id: 'sdkgj9sd8gy9g9h',
    month: '2021-12-25 20:53:46',
    recurrence: '1/5',
    value: 100000,
  },
  {
    id: 'opwjgfn9wg94n',
    account_id: '000002',
    income_id: 'gfdgdfjjtj466uj',
    month: '2021-12-25 20:53:46',
    recurrence: 'mensal',
    value: 50000,
  },
]