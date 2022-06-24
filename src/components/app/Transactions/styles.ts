import styled from 'styled-components';

interface TextProps {
  color: string;
}

interface TransactionItemProps {
  backgroundColor: string;
  textOpacity?: number;
}

interface TextContainerProps {
  strongColor: string;
  regularColor: string;
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
`
export const Title = styled.p<TextProps>`
  color: ${(props) => props.color};
  font-weight: 600;
`

export const ViewButton = styled.button``

export const TransactionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const TransactionItem = styled.div<TransactionItemProps>`
  display: flex;
  align-items: center;
  gap: 1.125rem;
  background-color: ${(props) => props.backgroundColor};
  border-radius: 10px;
  height: 2.4rem;

  padding: 0 0.8rem;

  > p{
    opacity: ${(props) => props.textOpacity ? props.textOpacity : 1};
    font-size: 0.625rem;
  }
`

export const TextContainer = styled.div<TextContainerProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;

  strong{
    font-size: 0.75rem;
    font-weight: 500;

    color: ${(props) => props.strongColor};
  }

  p{
    font-size: 0.75rem;
    color: ${(props) => props.regularColor};
  }
`

export const CensoredContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`