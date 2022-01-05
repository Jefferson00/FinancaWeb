import { observer } from "mobx-react-lite";
import { FaDollarSign } from "react-icons/fa";
import { useStores } from "../../store";
import { getMounthAndYear } from "../../utils/dateFormats";
import { getCurrencyFormat } from "../../utils/getCurrencyFormat";
import * as S from './styles';

interface BalanceCardProps {
  primaryColor: string;
  secondColor: string;
  type: 'EXPANSE' | 'INCOME';
  balance: {
    currentBalance: number;
    estimateBalance: number;
  }
}

const BalanceCard = observer(({
  primaryColor,
  secondColor,
  type,
  balance,
}: BalanceCardProps) => {
  const { financeStore } = useStores();
  const { financeData } = financeStore;
  const { month } = financeData;

  return (
    <S.Container linearGradient={{
      first: primaryColor,
      second: secondColor
    }}>
      <div>
        <S.Title>
          {type === 'INCOME' && `Receitas ${getMounthAndYear(month)}`}
          {type === 'EXPANSE' && `Despesas ${getMounthAndYear(month)}`}
        </S.Title>
        <S.Value>
          {getCurrencyFormat(balance.currentBalance)}
        </S.Value>
        <S.Subvalue>
          {`Previsto ${getCurrencyFormat(balance.estimateBalance)}`}
        </S.Subvalue>
      </div>
      <div>
        <span>
          <FaDollarSign size={25} color={primaryColor} />
        </span>
      </div>
    </S.Container>
  )
});

export default BalanceCard;