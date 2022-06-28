import { FaDollarSign, FaInfoCircle } from "react-icons/fa";
import { getDayOfTheMounth, getMonthName } from "../../../utils/dateFormats";
import { getCurrencyFormat } from "../../../utils/getCurrencyFormat";
import * as S from "./styles";
import Switch from "react-switch";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import State from "../../../store/interfaces";
import { isSameMonth } from "date-fns";

const ExpandableCard = () => {
  const {
    cardSelected,
    invoiceSelected,
    expanseOnInvoiceDays,
    paidExpanseOnInvoiceDays,
    paidInvoiceSelected,
  } = useSelector((state: State) => state.creditCards);
  const { selectedMonth } = useSelector((state: State) => state.dates);
  const [checked, setChecked] = useState(false);
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
    <S.Container background={cardSelected.color}>
      <section>
        <header>
          <strong>{cardSelected.name}</strong>
          <FaInfoCircle size={21} color="#CC3728" />
        </header>

        <main>
          <div>
            <p>Fatura atual</p>
            <strong>{getCurrencyFormat(invoiceSelected?.value || 0)}</strong>
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
            <p>{getCurrencyFormat(cardSelected.limit)}</p>
          </div>

          <div>
            <p>Data de pagamento</p>
            <p>{getDayOfTheMounth(new Date(cardSelected.paymentDate))}</p>
          </div>
        </footer>
      </section>

      <S.InvoiceExpanses ref={listRef}>
        {invoiceSelected?.ExpanseOnInvoice?.length === 0 && (
          <S.Item>
            <div>
              <p>Nenhuma despesa nessa fatura</p>
            </div>
          </S.Item>
        )}
        {expanseOnInvoiceDays.map((day, index) => (
          <div key={index}>
            <p>
              {day} de {getMonthName(new Date(invoiceSelected.month))}
            </p>
            {invoiceSelected?.ExpanseOnInvoice.filter(
              (exp) => exp.day === day
            ).map((expanse) => (
              <S.Item key={expanse.id}>
                <span>
                  <FaDollarSign size={21} color={cardSelected.color} />
                </span>
                <div>
                  <p>{`${expanse.name} - ${expanse.recurrence}`}</p>
                  <strong>{getCurrencyFormat(expanse.value)}</strong>
                </div>
              </S.Item>
            ))}
          </div>
        ))}

        {!!paidInvoiceSelected.id && isSameMonth(selectedMonth, new Date()) && (
          <div>
            <S.Item>
              <div>
                <p>
                  Fatura de {getMonthName(new Date(paidInvoiceSelected?.month))}{" "}
                  paga em{" "}
                  {getDayOfTheMounth(new Date(paidInvoiceSelected?.updatedAt))}
                </p>
              </div>
            </S.Item>

            {paidExpanseOnInvoiceDays.map((day) => (
              <div key={Math.random()}>
                <p>
                  {day} de {getMonthName(new Date(paidInvoiceSelected.month))}
                </p>

                {paidInvoiceSelected?.ExpanseOnInvoice.filter(
                  (exp) => exp.day === day
                ).map((expanse) => (
                  <S.Item key={expanse.id}>
                    <span>
                      <FaDollarSign size={21} color={cardSelected.color} />
                    </span>
                    <div>
                      <p>{`${expanse.name} - ${expanse.recurrence}`}</p>
                      <strong>{getCurrencyFormat(expanse.value)}</strong>
                    </div>
                  </S.Item>
                ))}
              </div>
            ))}
          </div>
        )}
      </S.InvoiceExpanses>
    </S.Container>
  );
};

export default ExpandableCard;
