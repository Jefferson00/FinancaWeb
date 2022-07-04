import styled from "styled-components";

interface TextProps {
  color: string;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 24.5rem;
`;
export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  width: 100%;

  padding: 0 0.5rem;

  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;
export const Title = styled.p<TextProps>`
  color: ${(props) => props.color};
  font-weight: 600;
`;
export const ViewButton = styled.button``;

export const CensoredContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const ItemsList = styled.div`
  max-height: 288px;
  overflow: hidden;
  overflow-y: none;

  &::-webkit-scrollbar {
    width: 4px;
    background: transparent;
  }

  &::-moz-scrollbar {
    width: 4px;
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: transparent;
    background: #d4e3f5;
  }
  > div {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
`;
export const DateText = styled.p<TextProps>`
  margin-top: 0.5rem;
  color: ${(props) => props.color};
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

export const Empty = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  margin-top: 2rem;
  height: 11rem;

  p {
    font-weight: 700;
  }
`;
