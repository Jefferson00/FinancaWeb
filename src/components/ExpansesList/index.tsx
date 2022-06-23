import { useEffect, useState, useRef } from "react";
import * as S from "./styles";
import { observer } from "mobx-react-lite";
import { Colors } from "../../styles/global";
import { FaBan, FaEye, FaEyeSlash, FaPlus } from "react-icons/fa";
import ItemView from "../ItemView";
import { getFullDayOfTheMounth } from "../../utils/dateFormats";
import Button from "../Button";

const ExpansesList = () => {
  const [censored, setCensored] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const expanses: any[] = [];

  const titleColor = Colors.BLUE_PRIMARY_LIGHTER;
  const textColor = Colors.MAIN_TEXT_LIGHTER;
  const primaryColor = Colors.RED_PRIMARY_LIGHTER;
  const secondaryColor = Colors.RED_SECONDARY_LIGHTER;

  useEffect(() => {
    const censoredStatusStoraged = localStorage.getItem(
      `financaWeb.censored.expanseList`
    );

    setCensored(censoredStatusStoraged === "true" ? true : false);
  }, []);

  const handleToggleCensored = () => {
    setCensored(!censored);

    localStorage.setItem(`financaWeb.censored.expanseList`, String(!censored));
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
    <S.Container>
      <S.Header>
        <div>
          <S.Title color={titleColor}>Despesas</S.Title>
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
        title="Nova despesa"
        icon={() => <FaPlus color="#FFF" size={25} />}
        colors={{
          PRIMARY_BACKGROUND: primaryColor,
          SECOND_BACKGROUND: secondaryColor,
          TEXT: "#fff",
        }}
      />

      {censored ? (
        <S.CensoredContainer>
          <FaBan size={40} color={titleColor} />
        </S.CensoredContainer>
      ) : (
        <S.ItemsList ref={listRef}>
          {expanses.map((item, index) => {
            return (
              <div key={index}>
                <S.DateText color={textColor}>
                  {getFullDayOfTheMounth(item.day)}
                </S.DateText>
                {item?.items?.map((i: any, index: number) => {
                  return <ItemView key={index} type={"EXPANSE"} item={i} />;
                })}
              </div>
            );
          })}
        </S.ItemsList>
      )}
    </S.Container>
  );
};

export default ExpansesList;
