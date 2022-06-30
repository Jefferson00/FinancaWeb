import styled from "styled-components";
import Switch from "react-switch";

export const Container = styled.div`
  position: absolute;
  top: 20%;
  left: 0;
  right: 0;

  backdrop-filter: blur(10px);
  width: 80%;
  min-height: 50%;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.3);

  border-radius: 10px;

  padding: 1rem 2rem;

  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

export const AvatarContainer = styled.section`
  flex: 1;

  display: flex;
  justify-content: flex-start;
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
  width: 7.43rem;
  height: 7.43rem;
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
