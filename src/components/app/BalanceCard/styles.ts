import styled, { css } from "styled-components";
import theme from "styled-theming";

interface ContainerProps {
  linearGradient: {
    first: string | theme.ThemeSet;
    second: string | theme.ThemeSet;
  };
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  height: 9.3rem;
  border-radius: 10px;
  padding: 1rem 1.3rem;
  justify-content: stretch;
  ${(props) =>
    props.linearGradient &&
    css`
      background: linear-gradient(
        107.87deg,
        ${props.linearGradient.first} -4.5%,
        ${props.linearGradient.second} 106.75%
      );
    `}

  div {
    &:last-child {
      flex: 1;
      display: flex;
      justify-content: flex-end;

      span {
        width: 2.5rem;
        height: 2.5rem;
        background-color: #fff;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;

        svg {
          color: ${(props) => props.linearGradient.first};
        }
      }
    }
  }
`;

export const Title = styled.p`
  font-size: 1.125rem;
  color: #fff;
  font-weight: 600;
`;
export const Value = styled.p`
  font-size: 1.5rem;
  color: #fff;
  font-weight: 600;
  margin-top: 1.5rem;
`;
export const Subvalue = styled.p`
  font-size: 0.8rem;
  color: #fff;
`;
