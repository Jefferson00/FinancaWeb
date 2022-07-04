import styled from "styled-components";

interface ContainerProps {
  background: string;
}

export const Container = styled.div<ContainerProps>`
  height: 11.25rem;
  border-radius: 20px;
  background: ${(props) => props.background};
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;

  cursor: pointer;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    flex: 1;

    strong {
      font-weight: 600;
      font-size: 1.125rem;
      color: #fff;
    }

    div {
      display: flex;
      gap: 0.5rem;
      button {
        background-color: #fff;
        width: 32px;
        height: 32px;
        border-radius: 50%;

        justify-content: center;
        align-items: center;
        display: flex;
      }
    }
  }

  main {
    display: flex;
    justify-content: space-between;
    align-items: center;

    div {
      p {
        color: #fff;
      }
      strong {
        font-weight: 600;
        font-size: 1.125rem;
        color: #fff;
      }
    }
  }

  footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    div {
      p {
        font-size: 0.75rem;
        color: #fff;
      }
    }
  }
`;
