import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-areas:
		"mainside menu"
		"mainside content"
		;
  gap: 3.37rem;
  transform: translateY(-3.5rem);
  padding: 0 6.56rem;
`

export const MenuList = styled.section`
  grid-area: menu;
  display: flex;
  gap: 1.87rem;
`

export const Aside = styled.section`
  grid-area: mainside;
`

export const Content = styled.section`
  grid-area: content;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
`