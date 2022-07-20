import { useEffect, useMemo, useState } from "react";
import * as S from "./styles";
import { GREEN_SOFT, RED_SOFT } from "../../../styles/global";
import { FaEdit, FaTrash } from "react-icons/fa";
import { getCurrencyFormat } from "../../../utils/getCurrencyFormat";
import Switch from "react-switch";
import State, { IIncomes, IIncomesOnAccount } from "../../../store/interfaces";
import { getDayOfTheMounth } from "../../../utils/dateFormats";
import { getCurrentIteration } from "../../../utils/getCurrentIteration";
import { reduceString } from "../../../utils/reduceString";
import { useSelector } from "react-redux";
import useCollapse from "react-collapsed";
import { getCategoryIcon } from "../../../utils/getCategoryIcon";
import { differenceInCalendarMonths } from "date-fns";

interface ItemType extends IIncomes, IIncomesOnAccount {}

interface ItemViewProps {
  type: "EXPANSE" | "INCOME";
  item: ItemType;
  switchValue?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onChangeSwitch?: () => void;
}

export default function ItemView({
  type,
  item,
  switchValue = false,
  onDelete,
  onEdit,
  onChangeSwitch = () => null,
}: ItemViewProps) {
  const { theme } = useSelector((state: State) => state.themes);
  const { accounts } = useSelector((state: State) => state.accounts);
  const { selectedMonth } = useSelector((state: State) => state.dates);
  const { getCollapseProps, getToggleProps } = useCollapse({
    expandStyles: {
      opacity: 0,
    },
    collapseStyles: {
      opacity: 0,
    },
  });

  const redPrimary = theme === "dark" ? "#AB5249" : "#CC3728";
  const redSecondary = theme === "dark" ? "#D46559" : "#D46559";
  const greenPrimary = theme === "dark" ? "#1A8289" : "#1A8289";
  const greenSecondary = theme === "dark" ? "#4F9BA0" : "#4F9BA0";

  const mainColor = type === "EXPANSE" ? redPrimary : greenPrimary;

  const secondColor = type === "EXPANSE" ? redSecondary : greenSecondary;

  const backgroundColor = type === "EXPANSE" ? RED_SOFT : GREEN_SOFT;

  const [receivedMessage, setReceivedMessage] = useState("");

  const currentPart = useMemo(() => {
    if (item.endDate) {
      return differenceInCalendarMonths(new Date(item.endDate), selectedMonth);
    } else {
      return null;
    }
  }, [item, selectedMonth]);

  useEffect(() => {
    setReceivedMessage("");
    if (!!item?.paymentDate) {
      const term = type === "EXPANSE" ? "Pago" : "Recebido";
      const date = getDayOfTheMounth(new Date(item.paymentDate));
      const accountName = reduceString(
        accounts.find((acc) => acc.id === item.accountId)?.name,
        16
      );

      const message = `${term} em ${date} - ${accountName}`;
      setReceivedMessage(message);
    }
  }, [accounts, item, type]);

  return (
    <S.Collapse backgroundColor={backgroundColor} mainColor={mainColor}>
      <S.CollapseContent mainColor={mainColor} {...getToggleProps()}>
        <div>
          {getCategoryIcon(item.category, mainColor, 24)}
          <strong>{item.name}</strong>{" "}
          {item.iteration && item.iteration !== "mensal" && (
            <strong>{getCurrentIteration(currentPart, item.iteration)}</strong>
          )}
          {item.recurrence && item.recurrence !== "mensal" && (
            <strong>{item.recurrence}</strong>
          )}
        </div>

        <p>{getCurrencyFormat(item.value)}</p>
      </S.CollapseContent>

      <S.Content {...getCollapseProps()}>
        <span>{receivedMessage}</span>
        <S.SwitchContainer>
          <p>{type === "EXPANSE" ? "Pago:" : "Recebido:"}</p>
          <Switch
            checked={switchValue}
            onChange={onChangeSwitch}
            checkedIcon={false}
            uncheckedIcon={false}
            offColor="#d2d2d2"
            onColor={mainColor}
            onHandleColor={mainColor}
            offHandleColor={secondColor}
            height={13}
            width={31}
            handleDiameter={20}
          />
        </S.SwitchContainer>

        <S.ButtonContainer>
          <button onClick={onEdit}>
            <FaEdit color={mainColor} size={22} />
          </button>
          {!item.paymentDate && (
            <button onClick={onDelete}>
              <FaTrash color={redPrimary} size={22} />
            </button>
          )}
        </S.ButtonContainer>
      </S.Content>
    </S.Collapse>
  );
}
