import { FaDollarSign, FaInfoCircle } from "react-icons/fa";
import { getDayOfTheMounth } from "../../../utils/dateFormats";
import { getCurrencyFormat } from "../../../utils/getCurrencyFormat";
import * as S from "./styles";
import Switch from "react-switch";
import { useEffect, useRef, useState } from "react";

interface ExpandableCardProps {
  card: {
    name: string;
    limit: number;
    pay_date: Date;
    color: string;
  };
  invoice: {
    value: number;
    paid: boolean;
    invoiceItems: {
      day: Date;
      items: {
        name: string;
        recurrence: string;
        value: number;
      }[];
    }[];
  };
}

const ExpandableCard = ({ card, invoice }: ExpandableCardProps) => {
  const [checked, setChecked] = useState(invoice?.paid);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.addEventListener("mouseenter", () => {
      if (listRef.current) listRef.current.style.overflowY = "scroll";
    });
    listRef.current?.addEventListener("mouseleave", () => {
      if (listRef.current) listRef.current.style.overflowY = "hidden";
    });
  }, []);

  return (
    <S.Container background={card.color}>
      <section>
        <header>
          <strong>{card.name}</strong>
          <FaInfoCircle size={21} color="#CC3728" />
        </header>

        <main>
          <div>
            <p>Fatura atual</p>
            <strong>{getCurrencyFormat(invoice.value)}</strong>
          </div>
          <div>
            <p>Pago:</p>
            <Switch
              checked={checked}
              onChange={() => setChecked(!checked)}
              checkedIcon={false}
              uncheckedIcon={false}
              offColor="#d2d2d2"
              onColor="#E59B93"
              onHandleColor="#E59B93"
              offHandleColor="#E59B93"
              height={13}
              width={31}
              handleDiameter={20}
            />
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
      </section>

      <S.InvoiceExpanses ref={listRef}>
        {invoice.invoiceItems.map((item) => (
          <div>
            <p>{getDayOfTheMounth(item.day)}</p>
            {item.items.map((i, index) => {
              return (
                <S.Item key={index}>
                  <span>
                    <FaDollarSign size={21} color={card.color} />
                  </span>
                  <div>
                    <p>{`${i.name} - ${i.recurrence}`}</p>
                    <strong>{getCurrencyFormat(i.value)}</strong>
                  </div>
                </S.Item>
              );
            })}
          </div>
        ))}
      </S.InvoiceExpanses>
    </S.Container>
  );
};

export default ExpandableCard;
