import { useEffect, useState, useRef } from "react";
import * as S from "./styles";
import { Colors } from "../../../styles/global";
import { FaBan, FaEye, FaEyeSlash, FaPlus } from "react-icons/fa";
import ItemView from "../../utils/ItemView";
import Button from "../../utils/Button";
import { useSelector } from "react-redux";
import State, { IIncomes } from "../../../store/interfaces";
import { listByDate } from "../../../utils/listByDate";
import { getMonthName } from "../../../utils/dateFormats";
import Modal from "../../utils/Modal";
import CreateIncome from "../CreateIncome";
import { useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  name: yup
    .string()
    .required("Campo obrigátorio")
    .min(2, "deve ter no mínimo 2 caracteres")
    .max(25, "deve ter no máximo 25 caracteres"),
});

type FormData = {
  name: string;
  value: string;
  status: boolean;
  receiptDefault: string;
  category: string | number;
};

const IncomeList = () => {
  const { incomes, incomesOnAccount, loading } = useSelector(
    (state: State) => state.incomes
  );
  const { selectedMonth } = useSelector((state: State) => state.dates);
  const [incomesListState, setIncomesListState] = useState<
    { day: number; items: any[] }[]
  >([]);

  const [censored, setCensored] = useState(false);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [incomeSelected, setIncomeSelected] = useState<IIncomes | null>(null);

  const listRef = useRef<HTMLDivElement>(null);

  const titleColor = Colors.BLUE_PRIMARY_LIGHTER;
  const textColor = Colors.MAIN_TEXT_LIGHTER;
  const primaryGreen = Colors.GREEN_PRIMARY_LIGHTER;
  const secondaryGreen = Colors.GREEN_SECONDARY_LIGHTER;

  const { control, handleSubmit, setValue } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const handleCloseAccountModal = () => {
    setModalVisibility(false);
  };

  useEffect(() => {
    const censoredStatusStoraged = localStorage.getItem(
      `financaWeb.censored.incomeList`
    );

    setCensored(censoredStatusStoraged === "true" ? true : false);
  }, []);

  const handleToggleCensored = () => {
    setCensored(!censored);

    localStorage.setItem(`financaWeb.censored.incomeList`, String(!censored));
  };

  useEffect(() => {
    listRef.current?.addEventListener("mouseenter", () => {
      if (listRef.current) listRef.current.style.overflowY = "scroll";
    });
    listRef.current?.addEventListener("mouseleave", () => {
      if (listRef.current) listRef.current.style.overflowY = "hidden";
    });
  }, []);

  useEffect(() => {
    const incomesList = listByDate(incomes, incomesOnAccount, selectedMonth);
    setIncomesListState(incomesList);
  }, [incomes, incomesOnAccount, selectedMonth]);

  return (
    <>
      <S.Container>
        <S.Header>
          <div>
            <S.Title color={titleColor}>Receitas</S.Title>
          </div>

          <S.ViewButton onClick={handleToggleCensored}>
            {censored ? (
              <FaEye color={titleColor} size={26} />
            ) : (
              <FaEyeSlash color={titleColor} size={26} />
            )}
          </S.ViewButton>
        </S.Header>

        <Button
          title="Nova receita"
          icon={() => <FaPlus color="#FFF" size={25} />}
          colors={{
            PRIMARY_BACKGROUND: primaryGreen,
            SECOND_BACKGROUND: secondaryGreen,
            TEXT: "#fff",
          }}
          onClick={() => setModalVisibility(true)}
        />

        {censored ? (
          <S.CensoredContainer>
            <FaBan size={40} color={titleColor} />
          </S.CensoredContainer>
        ) : (
          <S.ItemsList ref={listRef}>
            {loading ? (
              <p>Carregando...</p>
            ) : (
              incomesListState.map((item, index) => {
                return (
                  <div key={index}>
                    <S.DateText color={textColor}>
                      {item.day} de {getMonthName(selectedMonth)}
                    </S.DateText>
                    {item?.items?.map((i: any, index: number) => {
                      return <ItemView key={index} type={"INCOME"} item={i} />;
                    })}
                  </div>
                );
              })
            )}
          </S.ItemsList>
        )}
      </S.Container>

      <Modal visible={modalVisibility} onCancel={handleCloseAccountModal}>
        <CreateIncome
          control={control}
          incomeId={incomeSelected?.id}
          handleSubmit={handleSubmit}
          onFinish={handleCloseAccountModal}
        />
      </Modal>
    </>
  );
};

export default IncomeList;
