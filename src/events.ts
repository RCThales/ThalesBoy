import {
  turnConsoleOn,
  turnConsoleOff,
  changeConsoleColor,
  isConsoleOn,
  changeTheme,
} from "./index.js";

import {
  POWER_BTN_DESKTOP,
  POWER_BTN_MOBILE,
  BLUE_BUTTON,
  GREEN_BUTTON,
  PINK_BUTTON,
  PURPLE_BUTTON,
  YELLOW_BUTTON,
  THEME_BUTTON,
} from "./clickable_elements.js";

const powerButtonClickDesktop = POWER_BTN_DESKTOP.addEventListener(
  "pointerdown",
  () => {
    if (!isConsoleOn) {
      turnConsoleOn();
    } else {
      turnConsoleOff();
    }
    POWER_BTN_DESKTOP.removeEventListener();
  },
);

const powerButtonClickMobile = POWER_BTN_MOBILE.addEventListener(
  "pointerdown",
  () => {
    if (!isConsoleOn) {
      turnConsoleOn();
    } else {
      turnConsoleOff();
    }
    POWER_BTN_MOBILE.removeEventListener();
  },
);

const yellowButtonClick = YELLOW_BUTTON.addEventListener("pointerup", () => {
  changeConsoleColor("yellow");
});
const blueButtonClick = BLUE_BUTTON.addEventListener("pointerup", () => {
  changeConsoleColor("blue");
});
const pinkButtonClick = PINK_BUTTON.addEventListener("pointerup", () => {
  changeConsoleColor("pink");
});
const purpleButtonClick = PURPLE_BUTTON.addEventListener("pointerup", () => {
  changeConsoleColor("purple");
});
const greenButtonClick = GREEN_BUTTON.addEventListener("pointerup", () => {
  changeConsoleColor("green");
});
const themeButtonClick = THEME_BUTTON.addEventListener("pointerup", () => {
  changeTheme();
});
