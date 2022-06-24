import * as S from "./styles";
import { FiX } from "react-icons/fi";
import { useState } from "react";

interface ModalProps {
  visible: boolean;
  children: React.ReactNode;
  width?: string | number;
  onConfirm?: (...args: any) => any;
  onCancel?: (...args: any) => any;
  animation?: any;
}

export default function Modal({
  children,
  onCancel,
  visible = false,
  animation = "slide",
}: ModalProps) {
  const [closeAnimation, setCloseAnimation] = useState(false);

  const handleClose = (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
  ) => {
    setCloseAnimation(true);

    setTimeout(() => {
      onCancel?.(e);
      setCloseAnimation(false);
    }, 300);
  };

  return (
    <S.Container visible={visible} onClick={(e) => handleClose(e)}>
      <S.Content
        animation={animation}
        closeAnimation={closeAnimation}
        onClick={(e) => e.stopPropagation()}
      >
        <S.CloseButton onClick={handleClose}>
          <FiX size={24} />
        </S.CloseButton>
        {children}
      </S.Content>
    </S.Container>
  );
}
