import styled from "styled-components";
import { MAIN_TEXT, sizes } from "../../../styles/global";

export const Container = styled.div`
  width: 100%;

  padding: 2rem 3rem;

  @media (max-width: ${sizes.mobileL}) {
    padding: 2rem 1rem;
  }
`;

export const DeleteButton = styled.button`
  align-self: center;
`;

export const ButtonContainer = styled.div`
  max-width: 17rem;
  margin: 0 auto;
  margin-top: 3.5rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
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

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;

  gap: 1rem;
`;

export const Col = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

interface TextProps {
  color: string;
}

export const Label = styled.label<TextProps>`
  color: ${MAIN_TEXT};
  font-size: 1rem;
  align-self: flex-start;

  margin: 1rem 0 1rem 0;
`;
