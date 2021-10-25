import styled from 'styled-components';

interface MainContainer {
  backgroundColor: string,
  borderColor?: string;
}

interface IconContainer {
  backgroundColor: string,
}

interface TextColor {
  color: string,
}

export const Container = styled.button`
  height: 3.5rem;
  width: 100%;
  display: flex;
`
export const Main = styled.div<MainContainer>`
  height: 100%;
  display: flex;
  flex:1;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  background-color: ${(props) => props.backgroundColor};
`
export const MainText = styled.p<TextColor>`
  color:${(props) => props.color};
  font-weight: 600;
`
export const Icon = styled.div<IconContainer>`
  display: flex;
  width: 3.5rem;
  height: 100%;
  align-items: center;
  justify-content: center;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  background-color: ${(props) => props.backgroundColor};
`