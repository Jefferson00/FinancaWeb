import { ButtonHTMLAttributes } from "react";
import * as S from "./styles";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.FC;
  title: string;
  color: string;
  backgroundColor: string;
  border?: string;
  checked?: boolean;
  children?: React.ReactNode;
  dropDownContent?: React.ReactNode;
  openDropDown?: boolean;
}

export default function SelectButton({
  title,
  icon: Icon,
  color,
  backgroundColor,
  border,
  checked,
  children,
  dropDownContent,
  openDropDown = false,
  ...rest
}: ButtonProps) {
  return (
    <S.Container
      backgroundColor={backgroundColor}
      color={color}
      checked={checked}
      style={{
        borderBottomLeftRadius: openDropDown ? 0 : 10,
        borderBottomRightRadius: openDropDown ? 0 : 10,
      }}
      {...rest}
    >
      <S.Option color={color}>{children ? children : title}</S.Option>
      <Icon />

      <S.HiddenDropDown height={openDropDown ? 6 : 0}>
        {dropDownContent}
      </S.HiddenDropDown>
    </S.Container>
  );
}
