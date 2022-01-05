import { observer } from "mobx-react-lite";
import { Colors } from "../../styles/global";
import BalanceCard from "../BalanceCard";
import * as S from './styles';

const IncomeResume = observer(() => {
  const primaryColor = Colors.GREEN_PRIMARY_LIGHTER;
  const secondColor = Colors.ORANGE_SECONDARY_LIGHTER;

  return (
    <S.Container>
      <BalanceCard
        primaryColor={primaryColor}
        secondColor={secondColor}
        type="INCOME"
        balance={{
          currentBalance: 100000,
          estimateBalance: 80000
        }}
      />
    </S.Container>
  )
});

export default IncomeResume;