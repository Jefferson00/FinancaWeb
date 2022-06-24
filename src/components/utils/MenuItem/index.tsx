import * as S from "./styles";
import { Colors } from "../../../styles/global";
import { IconBaseProps } from "react-icons";
import { ButtonHTMLAttributes } from "react";

interface MenuItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  icon: React.FC<IconBaseProps>;
  selected?: boolean;
}

export default function MenuItem({
  title,
  icon: Icon,
  selected,
  ...rest
}: MenuItemProps) {
  const backgroundColor = Colors.BLUE_SOFT_LIGHTER;
  const iconColor = Colors.BLUE_PRIMARY_LIGHTER;
  const textColor = Colors.MAIN_TEXT_LIGHTER;

  return (
    <S.Container backgroundColor={backgroundColor} {...rest}>
      <S.IconButton backgroundColor={iconColor} selected={selected}>
        <Icon size={53} color="#FFF" />
      </S.IconButton>

      <S.Title color={textColor}>{title}</S.Title>
    </S.Container>
  );
}
