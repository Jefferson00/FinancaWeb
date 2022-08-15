import styled from "styled-components";
import { BLUE_PRIMARY, MAIN_TEXT, sizes } from "../../../styles/global";

interface TextProps {
  color: string;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 24.5rem;

  @media (max-width: ${sizes.mobileL}) {
    padding-bottom: 4rem;
  }
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
  color: ${BLUE_PRIMARY};
  font-weight: 600;
`;
export const ViewButton = styled.button``;

export const CensoredContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 16rem;
`;
export const ItemsList = styled.div`
  max-height: 288px;
  overflow: hidden;
  overflow-y: none;

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
export const DateText = styled.p<TextProps>`
  margin-top: 0.5rem;
  color: ${MAIN_TEXT};
`;

export const Empty = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  margin-top: 2rem;
  height: 11rem;

  p {
    font-weight: 700;
  }
`;

export const CardButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  border-radius: 20px;
  width: 100%;
  padding: 0.5rem 1rem;

  margin-top: 1rem;
  transition: all 0.4s;

  background-color: ${BLUE_PRIMARY};
  color: #fff;

  &:hover {
    filter: brightness(0.9);
  }
`;
