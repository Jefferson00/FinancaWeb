import styled, { css } from "styled-components";

interface SelectOptionProps {
  color?: string;
  backgroundColor?: string;
  border?: string;
  checked?: boolean;
}

export const Container = styled.button<SelectOptionProps>`
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : "#E2EDF0"};

  display: flex;
  align-items: center;

  border-radius: 10px;

  padding: 0 1rem;
  height: 3rem;

  ${(props) =>
    props.checked &&
    css`
      border: 1px solid;
      border-color: ${props.color ? props.color : "#09192D"};
    `}
`;
export const Option = styled.p<SelectOptionProps>`
  color: ${(props) => (props.color ? props.color : "#09192D")};
  font-size: 1rem;

  margin-right: 0.5rem;
`;
