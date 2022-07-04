import { FaDollarSign, FaInfoCircle } from "react-icons/fa";
import { getDayOfTheMounth, getMonthName } from "../../../utils/dateFormats";
import { getCurrencyFormat } from "../../../utils/getCurrencyFormat";
import * as S from "./styles";
import Switch from "react-switch";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import State, { IExpanseOnInvoice, IExpanses } from "../../../store/interfaces";
import { format, isSameMonth } from "date-fns";
import Modal from "../../utils/Modal";
import CreateExpanse from "../CreateExpanse";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ExpanseFormData } from "../../../utils/formDatas";
import { ExpanseCategories } from "../../../utils/types";
import Loader from "../../utils/Loader";

const schema = yup.object({
  name: yup
    .string()
    .required("Campo obrigátorio")
    .min(2, "deve ter no mínimo 2 caracteres")
    .max(25, "deve ter no máximo 25 caracteres"),
});

const ExpandableCard = () => {
  const {
    cardSelected,
    invoiceSelected,
    expanseOnInvoiceDays,
    paidExpanseOnInvoiceDays,
    paidInvoiceSelected,
    loading,
  } = useSelector((state: State) => state.creditCards);
  const { selectedMonth } = useSelector((state: State) => state.dates);
  const { expanses } = useSelector((state: State) => state.expanses);
  const [checked, setChecked] = useState(false);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [expanseSelected, setExpanseSelected] = useState<IExpanses | null>(
    null
  );

  const listRef = useRef<HTMLDivElement>(null);

  const { control, handleSubmit, setValue } = useForm<ExpanseFormData>({
    resolver: yupResolver(schema),
  });

  const handleCloseModal = () => {
    setModalVisibility(false);
    setValue("name", "");
    setValue("iteration", "1");
    setValue("category", ExpanseCategories[0].name);
    setValue("startDate", format(new Date(), "yyyy-MM-dd"));
    setValue("value", "0");
    setExpanseSelected(null);
  };

  const handleOpenEditModal = (expanseOnInvoice: IExpanseOnInvoice) => {
    const expanse = expanses.find(
      (exp) => exp.id === expanseOnInvoice.expanseId
    );
    if (expanse) {
      setModalVisibility(true);
      setValue("name", expanse.name);
      setValue("receiptDefault", expanse.receiptDefault);
      setValue("iteration", expanse.iteration);
      setValue("category", expanse.category);
      setValue("startDate", format(new Date(expanse.startDate), "yyyy-MM-dd"));
      setValue("value", String(expanse.value));
      setExpanseSelected(expanse);
    }
  };

  const showAlert = () => {
    return !invoiceSelected?.paid && invoiceSelected.closed;
  };

  useEffect(() => {
    listRef.current?.addEventListener("mouseenter", () => {
      if (listRef.current) listRef.current.style.overflowY = "scroll";
    });
    listRef.current?.addEventListener("mouseleave", () => {
      if (listRef.current) listRef.current.style.overflowY = "hidden";
    });
  }, []);

  return (
    <>
      <S.Container background={cardSelected.color} ref={listRef}>
        <section>
          <header>
            <strong>{cardSelected.name}</strong>
            {showAlert() && <FaInfoCircle size={21} color="#CC3728" />}
          </header>

          <main>
            <div>
              <p>Fatura atual</p>
              <strong>{getCurrencyFormat(invoiceSelected?.value || 0)}</strong>
            </div>
            {!invoiceSelected?.paid && invoiceSelected.closed && (
              <div>
                <p>Pagar:</p>
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
            )}
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

        <S.InvoiceExpanses>
          {loading && <Loader height="70" width="320" />}

          {!loading && invoiceSelected?.ExpanseOnInvoice?.length === 0 && (
            <S.Item>
              <div>
                <p>Nenhuma despesa nessa fatura</p>
              </div>
            </S.Item>
          )}
          {!loading &&
            expanseOnInvoiceDays.map((day, index) => (
              <div key={index}>
                <p>
                  {day} de {getMonthName(new Date(invoiceSelected.month))}
                </p>
                {invoiceSelected?.ExpanseOnInvoice.filter(
                  (exp) => exp.day === day
                ).map((expanse) => (
                  <S.Item
                    key={expanse.id}
                    onClick={() => handleOpenEditModal(expanse)}
                  >
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
                    Fatura de{" "}
                    {getMonthName(new Date(paidInvoiceSelected?.month))} paga em{" "}
                    {getDayOfTheMounth(
                      new Date(paidInvoiceSelected?.updatedAt)
                    )}
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
      <Modal visible={modalVisibility} onCancel={handleCloseModal}>
        <CreateExpanse
          control={control}
          expanseId={expanseSelected?.id}
          handleSubmit={handleSubmit}
          onFinish={handleCloseModal}
          recurrence={
            expanseSelected?.iteration === "Mensal" ? "Mensal" : "Parcelada"
          }
          fromInvoice
        />
      </Modal>
    </>
  );
};

export default ExpandableCard;
