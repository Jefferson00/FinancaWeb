import styled, { css, keyframes } from "styled-components";

interface ContainerProps {
  visible: boolean;
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
  height: calc(100vh + 3.5rem);

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  transform: translateY(-6.5rem);
  z-index: 9999;

  display: ${(props) => (props.visible ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  justify-content: center;

  overflow: hidden;
`;

export const Content = styled.div<ContentProps>`
  min-width: 50vw;
  background-color: #fff;
  min-height: 50vh;

  position: relative;

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
