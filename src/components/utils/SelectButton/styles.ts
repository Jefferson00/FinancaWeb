import styled, { css } from "styled-components";
import theme from "styled-theming";
import { MAIN_TEXT, RED_SOFT } from "../../../styles/global";

interface SelectOptionProps {
  textColor: string | theme.ThemeSet;
  backgroundColor?: string | theme.ThemeSet;
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

  position: relative;

  ${(props) =>
    props.checked &&
    css`
      border: 1px solid;
      border-color: ${props.textColor};

      svg {
        fill: ${MAIN_TEXT};
      }
    `}
`;
export const Option = styled.p<SelectOptionProps>`
  color: ${(props) => props.textColor};
  font-size: 1rem;

  margin-right: 0.5rem;
`;

interface HiddenDropDownProps {
  height?: number;
}

export const HiddenDropDown = styled.div<HiddenDropDownProps>`
  position: absolute;
  width: 100%;
  height: ${(props) => `${props.height}rem`};
  background: ${RED_SOFT};
  top: 100%;
  z-index: 999;
  left: 0;
  overflow: hidden;

  transition: all 0.4s;
`;
