import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body{
    background: #f8f8f8;
    color: #414141;
  }
  h1, h2, h3, h4, h5, h6{
    color: #2673CE;
  }
  button{
    background: transparent;
    border: none;
    cursor: pointer;
  }
  body, input, button, label, textarea {
      font: 400 16px 'Poppins', sans-serif;
  }
  @media (max-width: 1080px){
    html{
        font-size: 93.75%; 
    }
  }
  
  @media (max-width:1366px){
      html{
          font-size:92%;
      }
  }
  @media (max-width: 720px){
    html{
        font-size: 87.5%; //14px
    }
  }
`

export const Colors = {
  BLUE_PRIMARY_LIGHTER: '#2673CE',
  BLUE_SECONDARY_LIGHTER: '#3C93F9',
  BLUE_SOFT_LIGHTER: '#D4E3F5',

  ORANGE_PRIMARY_LIGHTER: '#F9C33C',
  ORANGE_SECONDARY_LIGHTER: '#FF981E',

  MAIN_TEXT_LIGHTER: '#09192D',
  MAIN_TEXT_TITLE_LIGHTER: '#2673CE',

  GREEN_PRIMARY_LIGHTER: '#1A8289',
  GREEN_SECONDARY_LIGHTER: '#4F9BA0',

  RED_PRIMARY_LIGHTER: '#CC3728',
  RED_SECONDARY_LIGHTER: '#D46559',
}