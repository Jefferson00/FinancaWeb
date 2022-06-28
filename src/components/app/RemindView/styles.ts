import styled from "styled-components";

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
