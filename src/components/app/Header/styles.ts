import styled from "styled-components";
import image from "../../../assets/logoBackground.svg";
import { BLUE_PRIMARY, sizes } from "../../../styles/global";

interface ContainerProps {
  backgroundColor?: string;
  expanded?: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  height: ${(props) => (props.expanded ? "100vh" : "10rem")};
  background-color: ${BLUE_PRIMARY};
  background-image: url(${image});
  background-repeat: no-repeat;
  background-position: 100% 0%;

  display: flex;
  justify-content: space-between;

  padding: 1.2rem 6.65rem;

  @media (max-width: ${sizes.mobileL}) {
    padding: 1.2rem 1.65rem;
    background-position: 30% 0%;
  }
`;

export const Logo = styled.img`
  height: 4rem;
  margin: 0 5rem;

  @media (max-width: ${sizes.mobileL}) {
    margin: 0 1rem;
  }
`;
export const UserContainer = styled.div`
  display: flex;
  gap: 3rem;

  height: 4rem;
  align-items: center;

  @media (max-width: ${sizes.mobileL}) {
    gap: 1rem;
  }
`;
export const Welcome = styled.div`
  @media (max-width: ${sizes.mobileL}) {
    display: none;
  }
`;

export const Avatar = styled.img`
  width: 3.43rem;
  height: 3.43rem;
  border-radius: 50%;
`;
export const Text = styled.p`
  font-size: 1.125rem;
  color: #fff;

  @media (max-width: ${sizes.mobileL}) {
    font-size: 0.85rem;
  }
`;
export const BoldText = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff;

  @media (max-width: ${sizes.mobileL}) {
    font-size: 1rem;
  }
`;
export const SignOutButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
`;
