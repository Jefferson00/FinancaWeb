import * as S from "./styles";
import { FiAlertCircle, FiX } from "react-icons/fi";
import { useState } from "react";
import { Colors } from "../../../styles/global";

interface ModalProps {
  visible: boolean;
  children?: React.ReactNode;
  width?: string | number;
  onConfirm?: (...args: any) => any;
  onCancel?: (...args: any) => any;
  onSelectOption?: (...args: any) => any;
  animation?: any;
  overlaid?: boolean;
  type?: "Delete" | "Default" | "Warning" | "Confirmation" | "Success";
  title?: string;
  cancelButtonTitle?: string;
  okButtonTitle?: string;
  confirmationOptions?: any[];
  optionValue?: any;
}

export default function Modal({
  children,
  onConfirm,
  onCancel,
  onSelectOption,
  visible = false,
  animation = "slide",
  overlaid = false,
  type = "Default",
  title = "",
  cancelButtonTitle = "Cancelar",
  okButtonTitle = "Sim",
  confirmationOptions = [],
  optionValue,
}: ModalProps) {
  const [closeAnimation, setCloseAnimation] = useState(false);

  const cancelButtonColor =
    type === "Delete"
      ? Colors.BLUE_PRIMARY_LIGHTER
      : Colors.RED_PRIMARY_LIGHTER;
  const okButtonColor =
    type === "Delete"
      ? Colors.RED_PRIMARY_LIGHTER
      : Colors.BLUE_PRIMARY_LIGHTER;

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
    <S.Container
      overlaid={overlaid}
      visible={visible}
      onClick={(e) => handleClose(e)}
      type={type}
    >
      <S.Content
        animation={animation}
        closeAnimation={closeAnimation}
        onClick={(e) => e.stopPropagation()}
      >
        <S.CloseButton onClick={handleClose}>
          <FiX size={24} />
        </S.CloseButton>
        {type === "Delete" && (
          <S.ModalContent>
            <FiAlertCircle color={okButtonColor} size={34} />
            <strong>{title}</strong>

            <S.ButtonRowContainer>
              <S.Button
                background={cancelButtonColor}
                color="#fff"
                onClick={handleClose}
              >
                {cancelButtonTitle}
              </S.Button>
              <S.Button
                background={okButtonColor}
                color="#fff"
                onClick={onConfirm}
              >
                {okButtonTitle}
              </S.Button>
            </S.ButtonRowContainer>
          </S.ModalContent>
        )}
        {type === "Confirmation" && (
          <S.ModalContent>
            <strong>{title}</strong>

            <S.ButtonContainer>
              {confirmationOptions.map((option) => (
                <S.ConfirmationItem
                  onClick={() => onSelectOption && onSelectOption(option?.id)}
                  backgroundColor={
                    optionValue === option?.id ? "#ABCBF1" : "#D4E3F5"
                  }
                  key={option?.id}
                >
                  {option?.name}
                </S.ConfirmationItem>
              ))}
            </S.ButtonContainer>

            <S.ButtonRowContainer>
              <S.Button
                background="transparent"
                style={{ border: `1px solid ${cancelButtonColor}` }}
                color={cancelButtonColor}
                onClick={handleClose}
              >
                {cancelButtonTitle}
              </S.Button>
              <S.Button
                background={okButtonColor}
                color="#fff"
                onClick={onConfirm}
              >
                {okButtonTitle}
              </S.Button>
            </S.ButtonRowContainer>
          </S.ModalContent>
        )}
        {type === "Default" && children}
      </S.Content>
    </S.Container>
  );
}
