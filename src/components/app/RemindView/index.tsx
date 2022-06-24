import { useEffect, useState } from "react";
import * as S from "./styles";
import { Colors } from "../../../styles/global";
import {
  FaEye,
  FaEyeSlash,
  FaExclamationCircle,
  FaCalendarAlt,
  FaBan,
} from "react-icons/fa";
import ItemView from "../../utils/ItemView";
import { getFullDayOfTheMounth } from "../../../utils/dateFormats";

interface RemindViewProps {
  type: "LATE" | "NEXTDAYS";
  items: RemindItemProps[];
}

interface RemindItemProps {
  day: Date;
  items: {
    id: string;
    category: string;
    name: string;
    value: number;
    date: Date;
    type: "EXPANSE" | "INCOME";
    received: boolean;
  }[];
}

export default function RemindView({ type, items }: RemindViewProps) {
  const [censored, setCensored] = useState(false);

  const titleColor = Colors.BLUE_PRIMARY_LIGHTER;
  const redAlert = Colors.RED_PRIMARY_LIGHTER;

  useEffect(() => {
    const censoredStatusStoraged = localStorage.getItem(
      `financaWeb.censored.remind.${type}`
    );

    setCensored(censoredStatusStoraged === "true" ? true : false);
  }, [type]);

  const handleToggleCensored = () => {
    setCensored(!censored);

    localStorage.setItem(
      `financaWeb.censored.remind.${type}`,
      String(!censored)
    );
  };

  return (
    <S.Container>
      <S.Header>
        {type === "LATE" && (
          <div>
            <FaExclamationCircle color={redAlert} size={30} />
            <S.Title color={redAlert}>Atrasados</S.Title>
          </div>
        )}
        {type === "NEXTDAYS" && (
          <div>
            <FaCalendarAlt color={titleColor} size={30} />
            <S.Title color={titleColor}>Nos próximos dias</S.Title>
          </div>
        )}

        <S.ViewButton onClick={handleToggleCensored}>
          {censored ? (
            <FaEye color={titleColor} size={26} />
          ) : (
            <FaEyeSlash color={titleColor} size={26} />
          )}
        </S.ViewButton>
      </S.Header>

      {censored ? (
        <S.CensoredContainer>
          <FaBan size={40} color={titleColor} />
        </S.CensoredContainer>
      ) : (
        <S.ItemsList>
          {items.map((item, index) => {
            return (
              <div key={index}>
                <S.DateText>{getFullDayOfTheMounth(item.day)}</S.DateText>
                {item.items.map((i, index) => {
                  return <ItemView key={index} type={i.type} item={i} />;
                })}
              </div>
            );
          })}
        </S.ItemsList>
      )}
    </S.Container>
  );
}
