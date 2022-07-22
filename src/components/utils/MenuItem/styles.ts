import styled, { css } from "styled-components";
import {
  BLUE_PRIMARY,
  MAIN_TEXT,
  PRIMARY_INPUT,
  sizes,
} from "../../../styles/global";

export const Container = styled.button`
  width: 11.37rem;
  height: 10rem;
  border-radius: 0.625rem;
  background-color: ${PRIMARY_INPUT};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  @media (max-width: ${sizes.mobileL}) {
    width: 5rem;
    height: 5rem;

    p {
      display: none !important;
    }
  }
`;

export const Title = styled.p`
  font-size: 1.125rem;
  color: ${MAIN_TEXT};
`;

interface IconButtonProps {
  selected?: boolean;
}

export const IconButton = styled.div<IconButtonProps>`
  height: 5rem;
  width: 5rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0;
  background-color: ${BLUE_PRIMARY};
  opacity: 0.5;

  @media (max-width: ${sizes.mobileL}) {
    height: 3rem;
    width: 3rem;
  }

  ${(props) =>
    props.selected &&
    css`
      opacity: 1;
    `}
`;
