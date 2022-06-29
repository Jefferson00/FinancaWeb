import styled, { css, keyframes } from "styled-components";

interface ContainerProps {
  visible: boolean;
  overlaid: boolean;
  type: "Delete" | "Default" | "Warning" | "Confirmation" | "Success";
}

interface ContentProps {
  animation?: string;
  closeAnimation: boolean;
}

const slideAnimation = keyframes`
  0% { transform: translateY(200%)}
  30% { transform: translateY(0) }
`;

const closeSlideAnimation = keyframes`
  0% { transform: translateY(0)}
  30% { transform: translateY(200%) }
  100% { transform: translateY(200%)}
`;

const scaleAnimation = keyframes`
  0% { transform: scale(0)}
  30% { transform: scale(1) }
`;

const closeScaleAnimation = keyframes`
  0% { transform: scale(1)}
  30% { transform: scale(0) }
  100% { transform: scale(0)}
`;

export const Container = styled.div<ContainerProps>`
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);

  width: 100%;
  height: 100vh;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  // transform: translateY(-6.5rem);
  z-index: 9999;

  display: ${(props) => (props.visible ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  justify-content: center;

  overflow: hidden;

  ${(props) =>
    props.overlaid &&
    props.type === "Delete" &&
    css`
      background-color: rgba(255, 0, 0, 0.4);
    `}

  ${(props) =>
    props.overlaid &&
    props.type === "Warning" &&
    css`
      background-color: rgba(255, 255, 0, 0.4);
    `}
`;

export const Content = styled.div<ContentProps>`
  min-width: 50vw;
  background-color: #fff;
  min-height: 50vh;

  position: relative;

  overflow: auto;

  ${(props) =>
    props.animation &&
    !props.closeAnimation &&
    props.animation === "slide" &&
    css`
      animation-name: ${slideAnimation};
      animation-duration: 2s;
    `}

  ${(props) =>
    props.closeAnimation &&
    props.animation === "slide" &&
    css`
      animation-name: ${closeSlideAnimation};
      animation-duration: 2s;
      animation-fill-mode: forwards;
    `}
    
    ${(props) =>
    props.animation &&
    !props.closeAnimation &&
    props.animation === "scale" &&
    css`
      animation-name: ${scaleAnimation};
      animation-duration: 2s;
    `}

  ${(props) =>
    props.closeAnimation &&
    props.animation === "scale" &&
    css`
      animation-name: ${closeScaleAnimation};
      animation-duration: 2s;
      animation-fill-mode: forwards;
    `}
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 1rem;
`;

export const ModalContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  flex-direction: column;

  height: 100%;

  strong {
    font-size: 1.5rem;
    margin-top: 1rem;
  }
`;

export const ButtonContainer = styled.div`
  margin-top: 1rem;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 50%;
`;

export const ButtonRowContainer = styled.div`
  margin-top: 3.5rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
`;

interface ButtonProps {
  background: string;
  color: string;
}

export const Button = styled.button<ButtonProps>`
  background: ${(props) => props.background};
  color: ${(props) => props.color};

  width: 7rem;
  padding: 0.5rem;

  border-radius: 10px;

  transition: all 0.3s;

  &:hover {
    filter: brightness(0.8);
  }
`;

interface ConfirmationItemProps {
  backgroundColor: string;
  borderColor?: string;
  selected?: boolean;
}

export const ConfirmationItem = styled.button<ConfirmationItemProps>`
  background-color: ${(props) => props.backgroundColor};
  width: 100%;
  border-radius: 10px;
  height: 3rem;
  margin: 0.5rem 0;
  padding: 0 1rem;

  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) =>
    props.selected &&
    css`
      border: 1px solid;
      border-color: ${props.borderColor ? props.borderColor : "#000"};
    `}
`;
