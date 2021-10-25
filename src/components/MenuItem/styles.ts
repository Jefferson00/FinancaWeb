import styled, { css } from "styled-components";

interface ContainerProps {
  backgroundColor: string;
}

export const Container = styled.button<ContainerProps>`
  width: 11.37rem;
  height: 10rem;
  border-radius: 0.625rem;
  background-color: ${(props) => props.backgroundColor};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`

interface TitleProps {
  color: string;
}

export const Title = styled.p<TitleProps>`
  font-size: 1.125rem;
  color: ${(props) => props.color}
`

interface IconButtonProps {
  backgroundColor: string;
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
  background-color: ${(props) => props.backgroundColor};
  opacity: 0.5;

  ${(props) => props.selected &&
    css`
      opacity: 1;
    `
  }
`