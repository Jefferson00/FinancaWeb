import styled from "styled-components";

interface ContainerProps {
  backgroundColor: string;
  mainColor: string;
  textColor: string;
}
interface ContentProps {
  mainColor: string;
}

export const Collapse = styled.button<ContainerProps>`
  background-color: ${(props) => props.backgroundColor};
  border-color: ${(props) => props.mainColor};
  border-width: 2px;
  border-style: solid;
  border-radius: 20px;
  width: 100%;
  padding: 0.5rem 1rem;

  transition: all 0.4s;
`;

export const CollapseContent = styled.section<ContentProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

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
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;

  transition: opacity 0.4s;
  flex-wrap: wrap;

  span {
    font-size: 0.8rem;
  }
`;

export const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  margin-top: 1rem;
`;
