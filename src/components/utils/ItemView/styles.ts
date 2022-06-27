import styled from "styled-components";

interface ContainerProps {
  backgroundColor: string;
  mainColor: string;
  textColor: string;
}

export const Container = styled.details<ContainerProps>`
  background-color: ${(props) => props.backgroundColor};
  border-color: ${(props) => props.mainColor};
  border-width: 2px;
  border-style: solid;
  border-radius: 20px;
  width: 100%;
  padding: 0.5rem 1rem;
  cursor: pointer;

  transition: all 0.4s;

  &[open] summary ~ * {
    animation: open 0.5s ease-in-out;
  }

  @keyframes open {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  summary {
    display: flex;
    justify-content: space-between;
    align-items: center;

    > div {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      strong {
        font-size: 0.8rem;
      }
    }

    p {
      color: ${(props) => props.mainColor};
      font-weight: 600;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;

  span {
    font-size: 0.8rem;
  }
`;

export const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
