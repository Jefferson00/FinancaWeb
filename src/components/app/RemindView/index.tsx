import { useEffect, useState } from "react";
import * as S from "./styles";
import { BLUE_PRIMARY, Colors, RED_PRIMARY } from "../../../styles/global";
import {
  FaEye,
  FaEyeSlash,
  FaExclamationCircle,
  FaCalendarAlt,
  FaBan,
  FaDollarSign,
} from "react-icons/fa";
import State, { IExpanses, IIncomes } from "../../../store/interfaces";
import { getFullDayOfTheMounth } from "../../../utils/dateFormats";
import { getCurrencyFormat } from "../../../utils/getCurrencyFormat";
import Loader from "../../utils/Loader";
import { useSelector } from "react-redux";

interface RemindViewProps {
  type: "LATE" | "NEXTDAYS";
  items?: RemindItemProps[];
  lateItems?: ItemProps[];
  loading?: boolean;
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
  loading = false,
  lateItems = [],
}: RemindViewProps) {
  const { theme } = useSelector((state: State) => state.themes);
  const [censored, setCensored] = useState(false);
  const lateDaysState: string[] = [];
  const titleColor = theme === "dark" ? "#4876AC" : "#2673CE";
  const redAlert = theme === "dark" ? "#AB5249" : "#CC3728";

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
            <S.Title textColor={RED_PRIMARY}>Atrasados</S.Title>
          </div>
        )}
        {type === "NEXTDAYS" && (
          <div>
            <FaCalendarAlt color={titleColor} size={30} />
            <S.Title textColor={BLUE_PRIMARY}>Nos próximos dias</S.Title>
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
      ) : loading ? (
        <div style={{ marginTop: 16 }}>
          <Loader
            height="137.92px"
            width="360.63px"
            color="#D4E3F5"
            rectLength={3}
            rectProps={{
              height: "32",
              rx: "20",
              ry: "20",
              y: "0",
              x: "0",
              width: "360",
            }}
          />
        </div>
      ) : lateItems.length > 0 || items.length > 0 ? (
        <S.ItemsList>
          {lateItems.map((item, index) => {
            lateDaysState.push(item.receiptDate);
            return (
              <div key={index}>
                {lateDaysState.filter((ltd) => ltd === item.receiptDate)
                  .length <= 1 && (
                  <S.DateText>
                    {getFullDayOfTheMounth(new Date(item.receiptDate))}
                  </S.DateText>
                )}
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
      ) : (
        <S.Empty>
          <p>Nada por enquanto</p>
        </S.Empty>
      )}
    </S.Container>
  );
}
