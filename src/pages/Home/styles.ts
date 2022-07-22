import styled from "styled-components";
import { PRIMARY_INPUT, sizes } from "../../styles/global";

export const Container = styled.div`
  display: grid;
  grid-template-areas:
    "mainside menu"
    "mainside content";
  gap: 3.37rem;
  // transform: translateY(-3.5rem);
  padding: 0 6.56rem;
  grid-template-columns: max-content;

  position: relative;
  top: -3.5rem;

  @media (max-width: ${sizes.mobileL}) {
    grid-template-areas:
      "mainside"
      "mainside"
      "content"
      "menu";

    padding: 0 2.56rem;
    justify-content: center;
  }
`;

export const MenuList = styled.section`
  grid-area: menu;
  display: flex;
  gap: 1.87rem;

  @media (max-width: ${sizes.mobileL}) {
    gap: 1rem;
    position: fixed;
    bottom: 0;
    background: ${PRIMARY_INPUT};
    width: 100%;
    left: 0;
    padding: 1rem;
    justify-content: center;
    right: 0;
    border-top-right-radius: 40px;
    border-top-left-radius: 40px;
  }
`;

export const Aside = styled.section`
  grid-area: mainside;

  @media (max-width: ${sizes.mobileL}) {
    justify-self: center;
  }
`;

interface ContentProps {
  reverse?: boolean;
}

export const Content = styled.section<ContentProps>`
  grid-area: content;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;

  @media (max-width: ${sizes.mobileL}) {
    flex-direction: ${(props) => (props.reverse ? "column-reverse" : "column")};
  }
`;
