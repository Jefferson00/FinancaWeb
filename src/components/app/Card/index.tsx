import { FaInfoCircle } from "react-icons/fa";
import { getDayOfTheMounth } from "../../../utils/dateFormats";
import { getCurrencyFormat } from "../../../utils/getCurrencyFormat";
import * as S from "./styles";

interface CardProps {
  card: {
    name: string;
    limit: number;
    pay_date: Date;
    color: string;
  };
  invoice: {
    value: number;
  };
}

const Card = ({ card, invoice }: CardProps) => {
  return (
    <S.Container background={card.color}>
      <header>
        <strong>{card.name}</strong>
        <FaInfoCircle size={21} color="#CC3728" />
      </header>

      <main>
        <div>
          <p>Fatura atual</p>
          <strong>{getCurrencyFormat(invoice.value)}</strong>
        </div>
      </main>

      <footer>
        <div>
          <p>Limite disponível</p>
          <p>{getCurrencyFormat(card.limit)}</p>
        </div>

        <div>
          <p>Data de pagamento</p>
          <p>{getDayOfTheMounth(card.pay_date)}</p>
        </div>
      </footer>
    </S.Container>
  );
};

export default Card;
