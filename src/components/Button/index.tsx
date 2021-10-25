import { ButtonHTMLAttributes } from 'react';
import * as S from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.FC;
  title: string;
  colors: Colors;
}

interface Colors {
  PRIMARY_BACKGROUND: string,
  SECOND_BACKGROUND: string;
  BORDER?: string;
  TEXT: string;
}

export default function Button({ title, icon: Icon, colors, ...rest }: ButtonProps) {
  return (
    <S.Container {...rest}>
      <S.Main backgroundColor={colors.PRIMARY_BACKGROUND}>
        <S.MainText color={colors.TEXT}>
          {title}
        </S.MainText>
      </S.Main>

      <S.Icon backgroundColor={colors.SECOND_BACKGROUND}>
        <Icon />
      </S.Icon>
    </S.Container>
  )
}