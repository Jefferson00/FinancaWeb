import { ButtonHTMLAttributes, useState } from "react";
import * as S from "./styles";
import theme from "styled-theming";

import { useSpring } from "react-spring";

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
  const [isBooped, setIsBooped] = useState(false);

  const style = useSpring({
    transform: isBooped ? `scale(${0.9})` : `scale(1)`,
    config: {
      tension: 300,
      friction: 10,
    },
  });

  const triggerIn = () => {
    setIsBooped(true);
  };

  const triggerOut = () => {
    setIsBooped(false);
  };

  return (
    <S.Container
      {...rest}
      style={style}
      onMouseEnter={triggerIn}
      onMouseLeave={triggerOut}
    >
      <S.Main backgroundColor={colors.PRIMARY_BACKGROUND}>
        <S.MainText colorText={colors.TEXT}>{title}</S.MainText>
      </S.Main>

      <S.Icon backgroundColor={colors.SECOND_BACKGROUND}>
        <Icon />
      </S.Icon>
    </S.Container>
  );
}
