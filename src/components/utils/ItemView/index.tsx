import { useEffect, useState } from "react";
import * as S from "./styles";
import { Colors } from "../../../styles/global";
import { FaDollarSign } from "react-icons/fa";
import { getCurrencyFormat } from "../../../utils/getCurrencyFormat";
import Switch from "react-switch";
import State, { IIncomes, IIncomesOnAccount } from "../../../store/interfaces";
import { getDayOfTheMounth } from "../../../utils/dateFormats";
import { reduceString } from "../../../utils/reduceString";
import { useSelector } from "react-redux";

interface ItemType extends IIncomes, IIncomesOnAccount {}

interface ItemViewProps {
  type: "EXPANSE" | "INCOME";
  item: ItemType;
}

export default function ItemView({ type, item }: ItemViewProps) {
  const { accounts } = useSelector((state: State) => state.accounts);
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

  const [checked, setChecked] = useState(!!item?.paymentDate);
  const [receivedMessage, setReceivedMessage] = useState(
    type === "EXPANSE" ? "Pagar" : "Receber"
  );

  useEffect(() => {
    setChecked(!!item?.paymentDate);

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
    <S.Container
      backgroundColor={backgroundColor}
      mainColor={mainColor}
      textColor={textColor}
    >
      <summary>
        <div>
          <FaDollarSign size={24} color={mainColor} />

          <strong>{item.name}</strong>
        </div>

        <p>{getCurrencyFormat(item.value)}</p>
      </summary>

      <S.Content>
        <span>{receivedMessage}</span>
        <S.SwitchContainer>
          <p>Pago:</p>
          <Switch
            checked={checked}
            onChange={() => setChecked(!checked)}
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
      </S.Content>
    </S.Container>
  );
}
