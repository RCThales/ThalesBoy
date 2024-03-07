import {
  toggleBetweenDayAndNightTheme,
  makeCurrentColorButtonInvisible,
  makePreviousColorButtonVisible,
  closeAddGameModal,
  openAddGameModal,
  addGameToApi,
  consoleInstance,
} from "./index.js";

import keys from "./key_codes.js";

import {
  POWER_BTN_DESKTOP,
  POWER_BTN_MOBILE,
  THEME_BUTTON,
  GAME_PAD_UP_BUTTON,
  GAME_PAD_DOWN_BUTTON,
  GAME_PAD_LEFT_BUTTON,
  GAME_PAD_RIGHT_BUTTON,
  GAME_PAD_POSITIVE_BUTTON,
  GAME_PAD_NEGATIVE_BUTTON,
  GAME_PAD_START_BUTTON,
  GAME_PAD_SELECT_BUTTON,
  CONSOLE_COLOR_BUTTONS,
  ADD_GAME_MODAL_OVERLAY,
  ADD_GAME_MODAL_CLOSE_BUTTON,
  ADD_GAME_OPEN_BUTTON,
  SUBMIT_GAME_BUTTON,
  SUBMIT_GAME_FORM,
} from "./html_elements_index.js";

window.addEventListener("load", () => {
  consoleInstance.setConsoleColorOnStartUp();
});

CONSOLE_COLOR_BUTTONS.addEventListener("pointerup", (event) => {
  const target = event?.target as HTMLButtonElement;
  const colorClickedName = target.id.toString();
  console.log(colorClickedName);
  makePreviousColorButtonVisible();
  consoleInstance.changeConsoleColor(colorClickedName);
  makeCurrentColorButtonInvisible();
});

POWER_BTN_DESKTOP.addEventListener("pointerdown", () => {
  if (!consoleInstance.isConsoleOn) {
    consoleInstance.turnConsoleOn();
  } else {
    consoleInstance.turnConsoleOff();
  }
});
POWER_BTN_MOBILE.addEventListener("pointerdown", () => {
  if (!consoleInstance.isConsoleOn) {
    consoleInstance.turnConsoleOn();
  } else {
    consoleInstance.turnConsoleOff();
  }
});

THEME_BUTTON.addEventListener("pointerup", () => {
  toggleBetweenDayAndNightTheme();
});

ADD_GAME_MODAL_OVERLAY.addEventListener("pointerup", () => {
  closeAddGameModal();
});

ADD_GAME_MODAL_CLOSE_BUTTON.addEventListener("pointerup", () => {
  closeAddGameModal();
});
ADD_GAME_OPEN_BUTTON.addEventListener("pointerup", () => {
  openAddGameModal();
});

SUBMIT_GAME_FORM.addEventListener("submit", (event) => {
  event.preventDefault();
  addGameToApi();
});

const { up, left, right, down, select, start, positive, negative } = keys;
GAME_PAD_UP_BUTTON.addEventListener("pointerdown", () => {
  consoleInstance.dispacthClickEventsToConsoleScreenIFrame(up);
});
GAME_PAD_DOWN_BUTTON.addEventListener("pointerdown", () => {
  consoleInstance.dispacthClickEventsToConsoleScreenIFrame(down);
});
GAME_PAD_LEFT_BUTTON.addEventListener("pointerdown", () => {
  consoleInstance.dispacthClickEventsToConsoleScreenIFrame(left);
});
GAME_PAD_RIGHT_BUTTON.addEventListener("pointerdown", () => {
  consoleInstance.dispacthClickEventsToConsoleScreenIFrame(right);
});
GAME_PAD_POSITIVE_BUTTON.addEventListener("pointerdown", () => {
  consoleInstance.dispacthClickEventsToConsoleScreenIFrame(positive);
});
GAME_PAD_NEGATIVE_BUTTON.addEventListener("pointerdown", () => {
  consoleInstance.dispacthClickEventsToConsoleScreenIFrame(negative);
});
GAME_PAD_START_BUTTON.addEventListener("pointerdown", () => {
  consoleInstance.dispacthClickEventsToConsoleScreenIFrame(start);
});
GAME_PAD_SELECT_BUTTON.addEventListener("pointerdown", () => {
  consoleInstance.dispacthClickEventsToConsoleScreenIFrame(select);
});
