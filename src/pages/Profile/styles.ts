import styled from "styled-components";
import Switch from "react-switch";
import theme from "styled-theming";

export const BACKGROUND_COLOR = theme("theme", {
  light: "rgba(212, 227, 245, 0.6)",
  dark: "rgba(0, 0, 0, 0.6)",
});
export const CONTAINER_BACKGROUND_COLOR = theme("theme", {
  light: "rgba(212, 227, 245, 0.3)",
  dark: "rgba(0, 0, 0, 0.3)",
});

export const Container = styled.div`
  position: absolute;
  top: 20%;
  left: 0;
  right: 0;

  backdrop-filter: blur(10px);
  width: 80%;
  min-height: 50%;
  margin: 0 auto;
  background-color: ${CONTAINER_BACKGROUND_COLOR};

  border-radius: 10px;

  padding: 1rem 2rem;

  display: flex;
  justify-content: space-between;
  gap: 1rem;

  z-index: 999;
`;

export const AvatarContainer = styled.section`
  flex: 1;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 2rem;

  padding: 2rem 0;
`;

export const FormContainer = styled.section`
  flex: 1;

  form {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    width: 100%;
  }
`;

export const ButtonContainer = styled.div`
  width: 15rem;
  margin-top: 2rem;
`;

export const Avatar = styled.img`
  width: 10.43rem;
  height: 10.43rem;
  border-radius: 50%;
`;

export const ThemeSwitch = styled(Switch)``;

export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const Background = styled.div`
  background: linear-gradient(
    10deg,
    ${BACKGROUND_COLOR} 20%,
    rgba(249, 195, 60, 0) 100%
  );
  width: 100%;
  height: 100vh;

  position: absolute;
  top: 0;
  left: 0;
  right: 0;

  pointer-events: none;
`;
