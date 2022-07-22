import { createGlobalStyle } from "styled-components";
import theme from "styled-theming";

export const sizes = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tablet: "768px",
  laptop: "1024px",
  laptopL: "1440px",
  desktop: "2560px",
};

export const devices = {
  mobileS: `(min-width: ${sizes.mobileS})`,
  mobileM: `(min-width: ${sizes.mobileM})`,
  mobileL: `(min-width: ${sizes.mobileL})`,
  tablet: `(min-width: ${sizes.tablet})`,
  laptop: `(min-width: ${sizes.laptop})`,
  laptopL: `(min-width: ${sizes.laptopL})`,
  desktop: `(min-width: ${sizes.desktop})`,
};

export const BACKGROUND = theme("theme", {
  light: "#FFFFFF",
  dark: "#1C1C1C",
});
export const MAIN_TEXT = theme("theme", {
  light: "#09192D",
  dark: "#C5C5C5",
});
export const TEXT = theme("theme", {
  light: "#414141",
  dark: "#C5C5C5",
});
export const BLUE_PRIMARY = theme("theme", {
  light: "#2673CE",
  dark: "#4876AC",
});
export const BLUE_SECONDARY = theme("theme", {
  light: "#3C93F9",
  dark: "#6296D3",
});
export const ORANGE_PRIMARY = theme("theme", {
  light: "#F9C33C",
  dark: "#D3B362",
});
export const ORANGE_SECONDARY = theme("theme", {
  light: "#FF981E",
  dark: "#D2944B",
});
export const GREEN_PRIMARY = theme("theme", {
  light: "#1A8289",
  dark: "#326452",
});
export const GREEN_SECONDARY = theme("theme", {
  light: "#4F9BA0",
  dark: "#497162",
});
export const GREEN_SOFT = theme("theme", {
  light: "#D7E5E8",
  dark: "#262626",
});
export const RED_PRIMARY = theme("theme", {
  light: "#CC3728",
  dark: "#AB5249",
});
export const RED_SECONDARY = theme("theme", {
  light: "#D46559",
  dark: "#D46559",
});
export const RED_SOFT = theme("theme", {
  light: "#E9DEDF",
  dark: "#262626",
});
export const PRIMARY_INPUT = theme("theme", {
  light: "#D4E3F5",
  dark: "#262626",
});
export const INCOME_INPUT = theme("theme", {
  light: "#D4E3F5",
  dark: "#262626",
});

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body{
    background: ${BACKGROUND};
    color: ${TEXT};
  }
  h1, h2, h3, h4, h5, h6{
    color: ${BLUE_PRIMARY};
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
`;

export const Colors = {
  BLUE_PRIMARY_LIGHTER: "#2673CE",
  BLUE_SECONDARY_LIGHTER: "#3C93F9",
  BLUE_SOFT_LIGHTER: "#D4E3F5",

  ORANGE_PRIMARY_LIGHTER: "#F9C33C",
  ORANGE_SECONDARY_LIGHTER: "#FF981E",

  MAIN_TEXT_LIGHTER: "#09192D",
  MAIN_TEXT_TITLE_LIGHTER: "#2673CE",

  GREEN_PRIMARY_LIGHTER: "#1A8289",
  GREEN_SECONDARY_LIGHTER: "#4F9BA0",
  GREEN_SOFT_LIGHTER: "#D7E5E8",

  RED_PRIMARY_LIGHTER: "#CC3728",
  RED_SECONDARY_LIGHTER: "#D46559",
  RED_SOFT_LIGHTER: "#E9DEDF",
};
