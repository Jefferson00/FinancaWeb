import styled from "styled-components";
import { PRIMARY_INPUT, sizes } from "../../../styles/global";

export const Container = styled.div`
  border-radius: 20px;
  background-color: ${PRIMARY_INPUT}AA;
  backdrop-filter: blur(10px);

  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  gap: 0.5rem;

  position: fixed;
  bottom: 1rem;

  left: 0;
  right: 0;
  margin: 0 auto;

  padding: 0.5rem 2rem;
  width: 60%;

  p {
    font-size: 0.75rem;
  }

  @media (max-width: ${sizes.mobileL}) {
    position: fixed;
    bottom: 8rem;
    opacity: 0.2;
    width: 100%;

    &:hover {
      opacity: 1;
    }
  }
`;
