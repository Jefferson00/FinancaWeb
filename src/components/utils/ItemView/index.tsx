import { useEffect, useState } from "react";
import * as S from "./styles";
import { Colors } from "../../../styles/global";
import { FaDollarSign, FaEdit, FaTrash } from "react-icons/fa";
import { getCurrencyFormat } from "../../../utils/getCurrencyFormat";
import Switch from "react-switch";
import State, { IIncomes, IIncomesOnAccount } from "../../../store/interfaces";
import { getDayOfTheMounth } from "../../../utils/dateFormats";
import { reduceString } from "../../../utils/reduceString";
import { useSelector } from "react-redux";
import useCollapse from "react-collapsed";

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
  const { accounts } = useSelector((state: State) => state.accounts);
  const { getCollapseProps, getToggleProps } = useCollapse({
    expandStyles: {
      opacity: 0,
    },
    collapseStyles: {
      opacity: 0,
    },
  });

  const mainColor =
    type === "EXPANSE"
      ? Colors.RED_PRIMARY_LIGHTER
      : Colors.GREEN_PRIMARY_LIGHTER;
  const secondColor =
    type === "EXPANSE"
      ? Colors.RED_SECONDARY_LIGHTER
      : Colors.GREEN_SECONDARY_LIGHTER;
  const textColor = Colors.MAIN_TEXT_LIGHTER;
  const backgroundColor =
    type === "EXPANSE" ? Colors.RED_SOFT_LIGHTER : Colors.GREEN_SOFT_LIGHTER;

  // const [checked, setChecked] = useState(!!item?.paymentDate);
  const [receivedMessage, setReceivedMessage] = useState("");

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
    <S.Collapse
      backgroundColor={backgroundColor}
      mainColor={mainColor}
      textColor={textColor}
    >
      <S.CollapseContent mainColor={mainColor} {...getToggleProps()}>
        <div>
          <FaDollarSign size={24} color={mainColor} />

          <strong>{item.name}</strong>
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
          <button onClick={onDelete}>
            <FaTrash color="#d12" size={22} />
          </button>
        </S.ButtonContainer>
      </S.Content>
    </S.Collapse>
  );
}
