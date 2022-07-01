import { useEffect, useState, useRef } from "react";
import * as S from "./styles";
import { Colors } from "../../../styles/global";
import { FaBan, FaEye, FaEyeSlash, FaPlus } from "react-icons/fa";
import Button from "../../utils/Button";
import Card from "../Card";
import { useSelector } from "react-redux";
import State from "../../../store/interfaces";
import Loader from "../../utils/Loader";

const CardsList = () => {
  const { creditCards, loading } = useSelector(
    (state: State) => state.creditCards
  );
  const [censored, setCensored] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  const titleColor = Colors.BLUE_PRIMARY_LIGHTER;
  const primaryColor = Colors.RED_PRIMARY_LIGHTER;
  const secondaryColor = Colors.RED_SECONDARY_LIGHTER;

  useEffect(() => {
    const censoredStatusStoraged = localStorage.getItem(
      `financaWeb.censored.cardslist`
    );

    setCensored(censoredStatusStoraged === "true" ? true : false);
  }, []);

  const handleToggleCensored = () => {
    setCensored(!censored);

    localStorage.setItem(`financaWeb.censored.cardslist`, String(!censored));
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
          <S.Title color={titleColor}>Cartões</S.Title>
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
        title="Novo cartão"
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
      ) : loading ? (
        <div style={{ marginTop: 32 }}>
          <Loader width="390" height="180" color="#D4E3F5" />
        </div>
      ) : (
        <S.ItemsList ref={listRef}>
          {creditCards.map((card) => (
            <Card key={card.id} creditCard={card} />
          ))}
        </S.ItemsList>
      )}
    </S.Container>
  );
};

export default CardsList;
