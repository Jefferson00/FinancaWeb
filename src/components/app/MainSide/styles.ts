import styled, { css } from "styled-components";

interface ContainerProps {
  linearGradient: {
    first: string;
    second: string;
  };
}

export const Container = styled.div<ContainerProps>`
  height: 37rem;
  width: 20.56rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 10px;
  padding: 2.125rem 1.93rem;

  ${(props) =>
    props.linearGradient &&
    css`
      background: linear-gradient(
        129.78deg,
        ${props.linearGradient.first} 16.76%,
        ${props.linearGradient.second} 86.35%
      );
    `}
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const MonthSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
export const ViewButton = styled.button``;
export const Prev = styled.button``;
export const Next = styled.button``;

export const Month = styled.p`
  font-size: 1.5rem;
  color: #fff;
  font-weight: 600;
`;

/**
 * Balances
 */

interface BalanceTextProps {
  color: string;
  opacity?: number;
}

export const Balances = styled.div``;
export const Row = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
`;
export const Balance = styled.div`
  &:last-child {
    text-align: end;
  }
`;
export const Title = styled.p<BalanceTextProps>`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${(props) => props.color};
  opacity: ${(props) => (props.opacity ? props.opacity : 1)};
`;
export const Value = styled.p<BalanceTextProps>`
  font-size: 0.87rem;
  font-weight: 500;
  color: ${(props) => props.color};
  opacity: ${(props) => (props.opacity ? props.opacity : 1)};
`;

/**
Contas
*/

export const AccountContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;

  overflow: hidden;
`;

export const AccountCardList = styled.div`
  margin-top: 1rem;
  width: 100%;

  display: flex;
`;

interface DotsProps {
  selected?: boolean;
}

export const CardDots = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  justify-content: center;
`;

export const Dot = styled.button<DotsProps>`
  width: 1rem;
  height: 1rem;
  background: #ffffffaa;
  border-radius: 50%;

  ${(props) =>
    props.selected &&
    css`
      border: 2px solid #09192d;
      background: #fff;
    `}
`;

/*
 * Botões
 */

export const ButtonContainer = styled.div``;

export const AccountForm = styled.div`
  width: 100%;

  padding: 2rem 3rem;
`;

export const EmptyCard = styled.div`
  height: 8.125rem;
  width: 100%;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.26);
  padding: 1rem 1.43rem;

  display: flex;
  justify-content: center;
  align-items: center;

  p {
    text-align: center;
    color: #2673ce;
  }
`;
