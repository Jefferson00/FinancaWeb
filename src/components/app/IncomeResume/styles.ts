import styled from "styled-components";
import { sizes } from "../../../styles/global";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 24.5rem;
  min-height: 22rem;

  @media (max-width: ${sizes.mobileL}) {
    min-height: auto;
  }
`;
