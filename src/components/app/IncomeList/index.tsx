import { useEffect, useState, useRef } from "react";
import * as S from "./styles";
import { Colors } from "../../../styles/global";
import { FaBan, FaEye, FaEyeSlash, FaPlus } from "react-icons/fa";
import ItemView from "../../utils/ItemView";
import Button from "../../utils/Button";
import { useSelector } from "react-redux";
import State from "../../../store/interfaces";
import { listByDate } from "../../../utils/listByDate";
import { getMonthName } from "../../../utils/dateFormats";

const IncomeList = () => {
  const { incomes, incomesOnAccount, loading } = useSelector(
    (state: State) => state.incomes
  );
  const { selectedMonth } = useSelector((state: State) => state.dates);
  const [incomesListState, setIncomesListState] = useState<
    { day: number; items: any[] }[]
  >([]);

  const [censored, setCensored] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  const titleColor = Colors.BLUE_PRIMARY_LIGHTER;
  const textColor = Colors.MAIN_TEXT_LIGHTER;
  const primaryGreen = Colors.GREEN_PRIMARY_LIGHTER;
  const secondaryGreen = Colors.GREEN_SECONDARY_LIGHTER;

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
  );
};

export default IncomeList;
