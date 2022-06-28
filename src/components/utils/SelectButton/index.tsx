import { ButtonHTMLAttributes } from "react";
import * as S from "./styles";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.FC;
  title: string;
  color: string;
  backgroundColor: string;
  border?: string;
  checked?: boolean;
}

export default function SelectButton({
  title,
  icon: Icon,
  color,
  backgroundColor,
  border,
  checked,
  ...rest
}: ButtonProps) {
  return (
    <S.Container
      backgroundColor={backgroundColor}
      color={color}
      checked={checked}
      {...rest}
    >
      <S.Option color={color}>{title}</S.Option>
      <Icon />
    </S.Container>
  );
}
