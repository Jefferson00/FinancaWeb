import { useEffect, useState } from "react";
import * as S from "./styles";
import { Colors } from "../../../styles/global";
import {
  FaEye,
  FaEyeSlash,
  FaExclamationCircle,
  FaCalendarAlt,
  FaBan,
  FaDollarSign,
} from "react-icons/fa";
import { IExpanses, IIncomes } from "../../../store/interfaces";
import { getFullDayOfTheMounth } from "../../../utils/dateFormats";
import { getCurrencyFormat } from "../../../utils/getCurrencyFormat";

interface RemindViewProps {
  type: "LATE" | "NEXTDAYS";
  items?: RemindItemProps[];
  lateItems?: ItemProps[];
}

interface ItemProps extends IIncomes, IExpanses {
  type: "EXPANSE" | "INCOME";
}

interface RemindItemProps {
  day: Date;
  items: ItemProps[];
}

export default function RemindView({
  type,
  items = [],
  lateItems = [],
}: RemindViewProps) {
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
          {lateItems.map((item, index) => {
            return (
              <div key={index}>
                <S.DateText>
                  {getFullDayOfTheMounth(new Date(item.receiptDate))}
                </S.DateText>
                <S.Item type={item.type}>
                  <div>
                    <FaDollarSign
                      size={24}
                      color={
                        item.type === "EXPANSE"
                          ? Colors.RED_PRIMARY_LIGHTER
                          : Colors.GREEN_PRIMARY_LIGHTER
                      }
                    />

                    <strong>{item.name}</strong>
                  </div>

                  <p>{getCurrencyFormat(item.value)}</p>
                </S.Item>
              </div>
            );
          })}

          {items.map((item, index) => {
            return (
              <div key={index}>
                <S.DateText>{getFullDayOfTheMounth(item.day)}</S.DateText>
                {item.items.map((i, index) => {
                  return (
                    <S.Item key={index} type={i.type}>
                      <div>
                        <FaDollarSign
                          size={24}
                          color={
                            i.type === "EXPANSE"
                              ? Colors.RED_PRIMARY_LIGHTER
                              : Colors.GREEN_PRIMARY_LIGHTER
                          }
                        />

                        <strong>{i.name}</strong>
                      </div>

                      <p>{getCurrencyFormat(i.value)}</p>
                    </S.Item>
                  );
                })}
              </div>
            );
          })}
        </S.ItemsList>
      )}
    </S.Container>
  );
}
