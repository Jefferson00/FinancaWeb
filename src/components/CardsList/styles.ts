import styled from 'styled-components';

interface TextProps {
  color: string;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 24.5rem;
`
export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  width: 100%;

  padding: 0 0.5rem;

  div{
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`
export const Title = styled.p<TextProps>`
  color: ${(props) => props.color};
  font-weight: 600;
`
export const ViewButton = styled.button``

export const CensoredContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
export const ItemsList = styled.div`
  max-height: 288px;
  overflow: hidden;
  overflow-y: none;

  margin-top: 2rem;

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
    background: #D4E3F5;
  }
`
export const DateText = styled.p<TextProps>`
  margin-top: 0.5rem;
  color: ${(props) => props.color};
`