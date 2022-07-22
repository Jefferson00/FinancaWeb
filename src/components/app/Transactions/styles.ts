import styled from "styled-components";
import { BLUE_PRIMARY, MAIN_TEXT, PRIMARY_INPUT } from "../../../styles/global";
import theme from "styled-theming";

interface TransactionItemProps {
  textOpacity?: number;
}
interface TextContainerProps {
  regularColor: string | theme.ThemeSet;
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
`;
export const Title = styled.p`
  color: ${BLUE_PRIMARY};
  font-weight: 600;
`;

export const ViewButton = styled.button``;

export const TransactionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const TransactionItem = styled.div<TransactionItemProps>`
  display: flex;
  align-items: center;
  gap: 1.125rem;
  background-color: ${PRIMARY_INPUT};
  border-radius: 10px;
  height: 2.4rem;

  padding: 0 0.8rem;

  > p {
    opacity: ${(props) => (props.textOpacity ? props.textOpacity : 1)};
    font-size: 0.625rem;
  }
`;

export const TextContainer = styled.div<TextContainerProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;

  strong {
    font-size: 0.75rem;
    font-weight: 500;

    color: ${MAIN_TEXT};
  }

  p {
    font-size: 0.75rem;
    color: ${(props) => props.regularColor};
  }
`;

export const CensoredContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const EmptyItem = styled.div<TransactionItemProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 9.37rem;

  border-radius: 10px;

  background-color: ${PRIMARY_INPUT};
`;
