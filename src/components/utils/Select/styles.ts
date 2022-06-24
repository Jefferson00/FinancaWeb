import styled, { css } from "styled-components";

interface ContainerProps {
  backgroundColor: string;
  borderColor?: string;
  disabled?: boolean;
  isFocused?: boolean;
  isErrored?: boolean;
}

interface TextColor {
  color: string;
}

export const Label = styled.label<TextColor>`
  color: ${(props) => props.color};
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
  color: ${(props) => props.color};
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
  color: ${(props) => props.color};
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
  &:focus-visible,
  :focus {
    border: none;
    outline: none;
  }
`;
