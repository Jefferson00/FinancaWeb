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
  font-size: 0.8rem;
  text-align: left;
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

  padding: 0.3rem 1rem;

  ${(props) =>
    props.isErrored &&
    css`
      border: 2px solid #cc3728;
    `}
  ${(props) =>
    props.isFocused &&
    css`
      border: 2px solid #2673ce;
    `}

  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.6;
    `}
`;

export const InputText = styled.input<TextColor>`
  flex: 1;
  color: ${(props) => props.color};
  font-size: 1rem;
  height: 100%;
  width: 100%;
  background: transparent;
  border: none;

  &:focus-visible,
  :focus {
    border: none;
    outline: none;
  }
`;
