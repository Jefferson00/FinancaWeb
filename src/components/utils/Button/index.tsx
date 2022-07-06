import { ButtonHTMLAttributes } from "react";
import * as S from "./styles";
import theme from "styled-theming";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.FC;
  title: string;
  colors: Colors;
}

interface Colors {
  PRIMARY_BACKGROUND: string | theme.ThemeSet;
  SECOND_BACKGROUND: string | theme.ThemeSet;
  BORDER?: string;
  TEXT: string | theme.ThemeSet;
}

export default function Button({
  title,
  icon: Icon,
  colors,
  ...rest
}: ButtonProps) {
  return (
    <S.Container {...rest}>
      <S.Main backgroundColor={colors.PRIMARY_BACKGROUND}>
        <S.MainText colorText={colors.TEXT}>{title}</S.MainText>
      </S.Main>

      <S.Icon backgroundColor={colors.SECOND_BACKGROUND}>
        <Icon />
      </S.Icon>
    </S.Container>
  );
}
