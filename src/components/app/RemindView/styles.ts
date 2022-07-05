import styled from "styled-components";
import { Colors } from "../../../styles/global";

interface TextProps {
  color: string;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 24.5rem;
  min-height: 11rem;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  width: 100%;

  padding: 0 0.5rem;

  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;
export const Title = styled.p<TextProps>`
  color: ${(props) => props.color};
  font-weight: 600;
`;

export const ViewButton = styled.button``;

export const ItemsList = styled.div`
  > div {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
`;
export const DateText = styled.p`
  margin-top: 0.5rem;
`;
export const CensoredContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface ItemProps {
  type: "EXPANSE" | "INCOME";
}

export const Item = styled.div<ItemProps>`
  background-color: ${(props) =>
    props.type === "EXPANSE"
      ? Colors.RED_SOFT_LIGHTER
      : Colors.GREEN_SOFT_LIGHTER};
  border-color: ${(props) =>
    props.type === "EXPANSE"
      ? Colors.RED_PRIMARY_LIGHTER
      : Colors.GREEN_PRIMARY_LIGHTER};
  border-width: 2px;
  border-style: solid;
  border-radius: 20px;
  width: 100%;
  padding: 0.5rem 1rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;
