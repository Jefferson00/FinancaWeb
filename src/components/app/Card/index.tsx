/* eslint-disable array-callback-return */
import { addMonths, isSameMonth } from "date-fns";
import { HTMLAttributes, useCallback, useEffect, useState } from "react";
import { FaInfoCircle, FaPencilAlt, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import State, {
  ICreditCard,
  IExpanseOnInvoice,
  IInvoice,
} from "../../../store/interfaces";
import {
  addDays,
  addPaidDays,
  selectCreditCard,
  selectInvoice,
  selectPaidInvoice,
} from "../../../store/modules/CreditCards";
import { getDayOfTheMounth } from "../../../utils/dateFormats";
import { getCurrencyFormat } from "../../../utils/getCurrencyFormat";
import { getItemsInThisMonth } from "../../../utils/listByDate";
import * as S from "./styles";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  creditCard: ICreditCard;
  onDelete?: () => void;
  onEdit?: () => void;
}

const Card = ({ creditCard, onDelete, onEdit, ...rest }: CardProps) => {
  const dispatch = useDispatch<any>();
  const { cardSelected } = useSelector((state: State) => state.creditCards);
  const { selectedMonth } = useSelector((state: State) => state.dates);
  const { expanses } = useSelector((state: State) => state.expanses);
  const [daysState, setDaysState] = useState<number[]>([]);
  const [paidInvoiceDaysState, setPaidInvoiceDaysState] = useState<number[]>(
    []
  );
  const [currentInvoice, setCurrentInvoice] = useState<IInvoice>();
  const [currentPaidInvoiceState, setCurrentPaidInvoiceState] =
    useState<IInvoice>();

  const handleSelectCard = () => {
    dispatch(selectCreditCard(creditCard));
  };

  const getEstimateInvoice = useCallback(() => {
    const expansesInThisMonth = getItemsInThisMonth(expanses, selectedMonth);

    const expansesInThisCard = expansesInThisMonth.filter(
      (exp) => exp.receiptDefault === creditCard.id
    );

    const expanseOnInvoice: IExpanseOnInvoice[] = [];
    let invoiceValue = 0;
    const days: number[] = [];

    expansesInThisCard.map((exp, index) => {
      const expanseOnInvoiceObject: IExpanseOnInvoice = {
        id: String(index),
        expanseId: exp.id,
        name: exp.name,
        value: exp.value,
        invoiceId: "any",
        day: new Date(exp.startDate).getUTCDate(),
      };

      expanseOnInvoice.push(expanseOnInvoiceObject);

      if (!days.find((d) => d === expanseOnInvoiceObject.day))
        days.push(expanseOnInvoiceObject.day);
      invoiceValue = invoiceValue + exp.value;
    });

    setDaysState(days);
    const paymentDate = new Date(creditCard.paymentDate);
    paymentDate.setMonth(selectedMonth.getMonth());

    setCurrentInvoice({
      accountId: creditCard.receiptDefault,
      closed: true,
      id: "any",
      paid: true,
      value: invoiceValue,
      paymentDate: paymentDate.toISOString(),
      closingDate: creditCard.invoiceClosing,
      creditCardId: creditCard.id,
      month: selectedMonth.toISOString(),
      ExpanseOnInvoice: expanseOnInvoice,
      updatedAt: "",
    });
  }, [
    expanses,
    selectedMonth,
    creditCard.paymentDate,
    creditCard.receiptDefault,
    creditCard.invoiceClosing,
    creditCard.id,
  ]);

  const getCurrentPaidInvoice = useCallback(() => {
    const currentPaidInvoice = creditCard.Invoice.find(
      (invoice) =>
        isSameMonth(new Date(invoice.month), new Date()) && invoice.paid
    );
    setCurrentPaidInvoiceState(currentPaidInvoice);

    if (currentPaidInvoice) {
      const days: number[] = [];

      currentPaidInvoice.ExpanseOnInvoice.map((exp) => {
        if (!days.find((d) => d === exp.day)) days.push(exp.day);
      });

      setPaidInvoiceDaysState(days);
    }
  }, [creditCard]);

  const getInvoiceInThisMonth = useCallback(() => {
    const currentDate = new Date(selectedMonth);
    const nextMonth = addMonths(currentDate, 1);

    const invoiceInThisMonth = creditCard.Invoice.find(
      (invoice) =>
        isSameMonth(new Date(invoice.month), selectedMonth) && !invoice.paid
    );

    const invoiceInNextMonth = creditCard.Invoice.find((invoice) =>
      isSameMonth(new Date(invoice.month), nextMonth)
    );

    return invoiceInThisMonth ? invoiceInThisMonth : invoiceInNextMonth;
  }, [selectedMonth, creditCard]);

  const getCurrentInvoice = useCallback((invoiceInThisMonth: IInvoice) => {
    setCurrentInvoice(invoiceInThisMonth);

    const days: number[] = [];

    invoiceInThisMonth.ExpanseOnInvoice.map((exp) => {
      if (!days.find((d) => d === exp.day)) days.push(exp.day);
    });

    setDaysState(days);
  }, []);

  const canDelete = () => {
    return !creditCard.Invoice.find((inv) => inv.ExpanseOnInvoice.length > 0);
  };

  const showAlert = () => {
    return !!creditCard.Invoice.find((inv) => inv.closed && !inv.paid);
  };

  useEffect(() => {
    const invoiceInThisMonth = getInvoiceInThisMonth();
    getCurrentPaidInvoice();

    if (invoiceInThisMonth) {
      getCurrentInvoice(invoiceInThisMonth);
    } else {
      getEstimateInvoice();
    }
  }, [
    getInvoiceInThisMonth,
    getCurrentInvoice,
    getEstimateInvoice,
    getCurrentPaidInvoice,
  ]);

  useEffect(() => {
    if (cardSelected.id === creditCard.id && currentInvoice) {
      dispatch(selectInvoice(currentInvoice));
      dispatch(addDays(daysState));

      if (currentPaidInvoiceState && paidInvoiceDaysState) {
        dispatch(addPaidDays(paidInvoiceDaysState));
        dispatch(selectPaidInvoice(currentPaidInvoiceState));
      }
    }
  }, [
    cardSelected,
    dispatch,
    currentInvoice,
    creditCard,
    daysState,
    currentPaidInvoiceState,
    paidInvoiceDaysState,
  ]);

  return (
    <S.Container
      background={creditCard.color}
      onClick={handleSelectCard}
      {...rest}
    >
      <header>
        <strong>{creditCard.name}</strong>
        <div>
          {showAlert() && (
            <button type="button">
              <FaInfoCircle size={18} color="#CC3728" />
            </button>
          )}
          <button type="button" onClick={onEdit}>
            <FaPencilAlt size={18} color={creditCard.color} />
          </button>
          {canDelete() && (
            <button type="button" onClick={onDelete}>
              <FaTrash size={18} color="#CC3728" />
            </button>
          )}
        </div>
      </header>

      <main>
        <div>
          <p>Fatura atual</p>
          <strong>{getCurrencyFormat(currentInvoice?.value || 0)}</strong>
        </div>
      </main>

      <footer>
        <div>
          <p>Limite disponível</p>
          <p>{getCurrencyFormat(creditCard.limit)}</p>
        </div>

        <div>
          <p>Data de pagamento</p>
          <p>{getDayOfTheMounth(new Date(creditCard.paymentDate))}</p>
        </div>
      </footer>
    </S.Container>
  );
};

export default Card;
