import styled from "styled-components";
import image from "../../assets/logoBackground.svg";

interface ContainerProps {
  backgroundColor: string;
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  height: 10rem;
  background-color: ${(props) => props.backgroundColor};
  background-image: url(${image});
  background-repeat: no-repeat;
  background-position: 100% 0%;

  display: flex;
  justify-content: space-between;

  padding: 1.2rem 6.65rem;
`;

export const Logo = styled.img`
  height: 4rem;
  margin: 0 5rem;
`
export const UserContainer = styled.div`
  display: flex;
  gap: 3rem;
`
export const Welcome = styled.div``;

export const Avatar = styled.img`
  width: 3.43rem;
  height: 3.43rem;
`
export const Text = styled.p`
  font-size: 1.125rem;
  color:#fff;
`
export const BoldText = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
  color:#fff;
`