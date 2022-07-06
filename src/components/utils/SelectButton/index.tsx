import { ButtonHTMLAttributes } from "react";
import * as S from "./styles";
import theme from "styled-theming";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.FC;
  title: string;
  textColor: string | theme.ThemeSet;
  backgroundColor: string | theme.ThemeSet;
  border?: string;
  checked?: boolean;
  children?: React.ReactNode;
  dropDownContent?: React.ReactNode;
  openDropDown?: boolean;
}

export default function SelectButton({
  title,
  icon: Icon,
  textColor,
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
      textColor={textColor}
      checked={checked}
      style={{
        borderBottomLeftRadius: openDropDown ? 0 : 10,
        borderBottomRightRadius: openDropDown ? 0 : 10,
      }}
      {...rest}
    >
      <S.Option textColor={textColor}>{children ? children : title}</S.Option>
      <Icon />

      <S.HiddenDropDown height={openDropDown ? 6 : 0}>
        {dropDownContent}
      </S.HiddenDropDown>
    </S.Container>
  );
}
