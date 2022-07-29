import styled, { css } from "styled-components";
import theme from "styled-theming";

interface ContainerProps {
  backgroundColor: string | theme.ThemeSet;
  borderColor?: string | theme.ThemeSet;
  disabled?: boolean;
  isFocused?: boolean;
  isErrored?: boolean;
}

interface TextColor {
  textColor: string | theme.ThemeSet;
}

export const Label = styled.label<TextColor>`
  color: ${(props) => props.textColor};
  font-size: 1rem;
  align-self: flex-start;
`;

export const LabelContainer = styled.div`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;

  margin: 1rem 0 1rem 0;
`;

export const Alert = styled.p<TextColor>`
  color: ${(props) => props.textColor};
  font-size: 1rem;
  text-align: left;
  margin-left: 1rem;
`;

export const Container = styled.div<ContainerProps>`
  height: 3rem;
  width: 100%;
  flex-direction: row;
  border-radius: 10px;

  background-color: ${(props) => props.backgroundColor};

  align-items: center;
  justify-content: flex-end;
  position: relative;

  ${(props) =>
    props.isErrored &&
    css`
      border-width: 2px;
      border-color: #cc3728;
    `}
  ${(props) =>
    props.isFocused &&
    css`
      border-width: 2px;
      border-color: #2673ce;
    `}

  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.6;
    `}
`;

export const InputSelect = styled.select<TextColor>`
  flex: 1;
  color: ${(props) => props.textColor};
  font-size: 1rem;

  width: 100%;
  height: 100%;

  background: transparent;
  border: none;
  margin: 0;

  font-family: inherit;
  font-size: inherit;
  cursor: inherit;
  line-height: inherit;

  padding: 0.3rem 1rem;

  outline: none;

  margin: 0;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;

  background-image: linear-gradient(
      45deg,
      transparent 50%,
      ${(props) => props.textColor} 50%
    ),
    linear-gradient(135deg, ${(props) => props.textColor} 50%, transparent 50%),
    linear-gradient(to right, transparent, transparent);
  background-position: calc(100% - 20px) calc(1em + 6px),
    calc(100% - 15px) calc(1em + 6px), 100% 0;
  background-size: 5px 5px, 5px 5px, 2.5em 3.5em;
  background-repeat: no-repeat;

  &:focus-visible,
  :focus {
    background-image: linear-gradient(
        45deg,
        ${(props) => props.textColor} 50%,
        transparent 50%
      ),
      linear-gradient(
        135deg,
        transparent 50%,
        ${(props) => props.textColor} 50%
      );
    background-position: calc(100% - 15px) 1em, calc(100% - 20px) 1em,
      calc(100% - 3.5em) 0.5em;
    background-size: 5px 5px, 5px 5px, 1px 1.5em;
    background-repeat: no-repeat;

    border: none;
    outline: 0;
  }
`;
