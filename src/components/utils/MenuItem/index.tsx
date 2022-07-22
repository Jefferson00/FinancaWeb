import * as S from "./styles";
import { IconBaseProps } from "react-icons";
import { ButtonHTMLAttributes } from "react";
import { useMedia } from "../../../utils/media";
import { sizes } from "../../../styles/global";

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
  const mobileL = useMedia(`(max-width: ${sizes.mobileL})`);

  return (
    <S.Container {...rest}>
      <S.IconButton selected={selected}>
        <Icon size={mobileL ? 32 : 53} color="#FFF" />
      </S.IconButton>

      <S.Title>{title}</S.Title>
    </S.Container>
  );
}
