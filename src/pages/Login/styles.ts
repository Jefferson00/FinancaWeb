import styled from "styled-components";
import image from "../../assets/logoLogin.svg";

interface ContainerProps {
  backgroundColor: string;
}

export const Container = styled.div<ContainerProps>`
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.backgroundColor};
  background-image: url(${image});
  background-repeat: no-repeat;
  background-position: 100% 50%;

  display: flex;
  justify-content: stretch;

  padding: 1.2rem 6.65rem;
`
export const TextSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5rem;
  flex: 1;
`
export const ActionSection = styled.section`
   display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
`

export const Logo = styled.img`
  height: 14.75rem;
`
export const Title = styled.h1`
  font-size: 3rem;
  color: #fff;
  max-width: 26.5rem;
  text-align: center;
`
export const ButtonContainer = styled.div`
  width: 18.43rem;
`