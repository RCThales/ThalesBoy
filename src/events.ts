import {
  turnConsoleOn,
  turnConsoleOff,
  changeConsoleColor,
  isConsoleOn,
  changeTheme,
  dispacthClickEventsToConsoleScreenIFrame,
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
  GAME_PAD_UP_BUTTON,
  GAME_PAD_DOWN_BUTTON,
  GAME_PAD_LEFT_BUTTON,
  GAME_PAD_RIGHT_BUTTON,
  GAME_PAD_POSITIVE_BUTTON,
  GAME_PAD_NEGATIVE_BUTTON,
  GAME_PAD_START_BUTTON,
  GAME_PAD_SELECT_BUTTON,
} from "./clickable_elements.js";

const powerButtonClickDesktop = POWER_BTN_DESKTOP.addEventListener(
  "pointerdown",
  () => {
    if (!isConsoleOn) {
      turnConsoleOn();
    } else {
      turnConsoleOff();
    }
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

const clickUpGamePadButton = GAME_PAD_UP_BUTTON.addEventListener(
  "pointerdown",
  () => {
    dispacthClickEventsToConsoleScreenIFrame("w");
  },
);

const clickDownGamePadButton = GAME_PAD_DOWN_BUTTON.addEventListener(
  "pointerdown",
  () => {
    dispacthClickEventsToConsoleScreenIFrame("s");
  },
);

const clickLeftGamePadButton = GAME_PAD_LEFT_BUTTON.addEventListener(
  "pointerdown",
  () => {
    dispacthClickEventsToConsoleScreenIFrame("a");
  },
);

const clickRightGamePadButton = GAME_PAD_RIGHT_BUTTON.addEventListener(
  "pointerdown",
  () => {
    dispacthClickEventsToConsoleScreenIFrame("d");
  },
);

const clickPositiveGamePadButton = GAME_PAD_POSITIVE_BUTTON.addEventListener(
  "pointerdown",
  () => {
    dispacthClickEventsToConsoleScreenIFrame("k");
  },
);

const clickNegativeGamePadButton = GAME_PAD_NEGATIVE_BUTTON.addEventListener(
  "pointerdown",
  () => {
    dispacthClickEventsToConsoleScreenIFrame("l");
  },
);

const clickStartGamePadButton = GAME_PAD_START_BUTTON.addEventListener(
  "pointerdown",
  () => {
    dispacthClickEventsToConsoleScreenIFrame("Enter");
  },
);

const clickSelectGamePadButton = GAME_PAD_SELECT_BUTTON.addEventListener(
  "pointerdown",
  () => {
    dispacthClickEventsToConsoleScreenIFrame("Space");
  },
);
