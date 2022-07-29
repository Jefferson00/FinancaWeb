import styled from "styled-components";
import theme from "styled-theming";
import {
  GREEN_PRIMARY,
  GREEN_SOFT,
  PRIMARY_INPUT,
  RED_PRIMARY,
  RED_SOFT,
} from "../../../styles/global";

interface TextProps {
  textColor: string | theme.ThemeSet;
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
  color: ${(props) => props.textColor};
  font-weight: 600;
`;

export const ViewButton = styled.button``;

export const ItemsList = styled.div`
  max-height: 13rem;
  overflow: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 4px;
    background: transparent;
  }

  &::-moz-scrollbar {
    width: 4px;
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: transparent;
    background: #d4e3f5;
  }

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
  min-height: 7rem;
`;

interface ItemProps {
  type: "EXPANSE" | "INCOME";
}

export const Item = styled.div<ItemProps>`
  background-color: ${(props) =>
    props.type === "EXPANSE" ? RED_SOFT : GREEN_SOFT};
  border-color: ${(props) =>
    props.type === "EXPANSE" ? RED_PRIMARY : GREEN_PRIMARY};
  border-width: 2px;
  border-style: solid;
  border-radius: 20px;
  width: 100%;
  padding: 0.5rem 1rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 1rem;

  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

export const Empty = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 6rem;
  width: 100%;
  margin-top: 1rem;

  background-color: ${PRIMARY_INPUT};
  border-radius: 10px;
`;
