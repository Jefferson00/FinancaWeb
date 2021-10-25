import styled from 'styled-components';

interface GraphContainerProps {
  backgroundColor: string;
}

interface TextProps {
  color: string;
}

interface GraphItemProps {
  strongColor: string;
  regularColor: string;
}

interface GraphIndicatorProps {
  heightIndicator: string;
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
`
export const Title = styled.p<TextProps>`
  color: ${(props) => props.color};
  font-weight: 600;
`

export const ViewButton = styled.button``

export const GraphContainer = styled.div<GraphContainerProps>`
  background-color: ${(props) => props.backgroundColor};
  height: 9.37rem;
  border-radius: 10px;
  padding: 1rem 1.5rem;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`

export const GraphItem = styled.div<GraphItemProps>`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;

  strong{
    font-size: 0.75rem;
    color: ${(props) => props.strongColor};
  }

  p{
    font-size: 0.5rem;
    color: ${(props) => props.regularColor};
    font-weight: 600;
  }
`

export const GraphIndicator = styled.div<GraphIndicatorProps>`
  background-color: ${(props) => props.color};
  height: ${(props) => props.heightIndicator}%;
  border-radius: 10px;
`