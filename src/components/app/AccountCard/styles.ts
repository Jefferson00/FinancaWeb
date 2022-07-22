import styled from "styled-components";

interface CardProps {}

interface TextProps {
  fontSize: string;
  opacity?: number;
  fontWeight?: number;
}

export const Container = styled.div<CardProps>`
  flex: none;
  height: 8.125rem;
  width: 100%;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.26);
  padding: 1rem 1.43rem;

  cursor: pointer;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const Title = styled.p`
  font-size: 1.125rem;
  font-weight: 600;
  color: #fff;
`;
export const Main = styled.div``;
export const Text = styled.p<TextProps>`
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : 600)};
  color: #fff;
`;
