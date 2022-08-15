import styled from "styled-components";
import {
  BLUE_PRIMARY,
  BLUE_SECONDARY,
  MAIN_TEXT,
  ORANGE_SECONDARY,
  PRIMARY_INPUT,
} from "../../../styles/global";

interface GraphIndicatorProps {
  heightIndicator: string;
  value?: string;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 24.5rem;
`;
export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  width: 100%;

  padding: 0 0.5rem;
`;
export const Title = styled.p`
  color: ${BLUE_PRIMARY};
  font-weight: 600;
`;

export const ViewButton = styled.button`
  svg {
    color: ${BLUE_PRIMARY};
  }
`;

export const GraphContainer = styled.div`
  background-color: ${PRIMARY_INPUT};
  height: 9.37rem;
  border-radius: 10px;
  padding: 1rem 1.5rem;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  svg {
    color: ${BLUE_PRIMARY};
  }
`;

export const GraphItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;

  strong {
    font-size: 0.75rem;
    color: ${MAIN_TEXT};
  }

  p {
    font-size: 0.5rem;
    color: ${BLUE_SECONDARY};
    font-weight: 600;
  }
`;

export const GraphIndicator = styled.div<GraphIndicatorProps>`
  background-color: ${ORANGE_SECONDARY};
  height: ${(props) => props.heightIndicator}%;
  border-radius: 10px;
  position: relative;

  &:hover::after {
    content: "${(props) => props.value && props.value}";
    position: absolute;
    left: -50%;
    z-index: 2;
    background: #656565;
    color: #fff;
    padding: 0.5rem;
  }
`;
