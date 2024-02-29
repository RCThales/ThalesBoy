import {
  YELLOW_BUTTON,
  BLUE_BUTTON,
  PINK_BUTTON,
  GREEN_BUTTON,
  PURPLE_BUTTON,
} from "./clickable_elements.js";

export const colors: Color = {
  yellow: {
    buttonElement: YELLOW_BUTTON,
    primary: "#f8b725",
    accent: "#fcbe2b",
    carving: "#e1b245",
  },
  blue: {
    buttonElement: BLUE_BUTTON,
    primary: "#008199",
    accent: "#0089A1",
    carving: "#00687A",
  },
  pink: {
    buttonElement: PINK_BUTTON,
    primary: "#e74254",
    accent: "#F7485C",
    carving: "#B83544",
  },
  purple: {
    buttonElement: PURPLE_BUTTON,
    primary: "#6d2fdc",
    accent: "#6A24E3",
    carving: "#5A26B5",
  },
  green: {
    buttonElement: GREEN_BUTTON,
    primary: "#79be01",
    accent: "#80C902",
    carving: "#619902",
  },
};

export const currentConsoleColor = localStorage.getItem("gameColor");
