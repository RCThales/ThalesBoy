import {
  makeCurrentColorButtonInvisible,
  makePreviousColorButtonVisible,
} from "./index.js";

import { consoleInstance } from "./index.js";
import key_codes from "./key_codes.js";

let currentSettingsMenuOption = 1;

const SETTINGS_OPTIONS = {
  MENU_OPTION_1: {
    action: () => toggleMuteOrUnmute(),
    name: "Mute",
  },
  MENU_OPTION_2: {
    action: () => colorChangeOnSettings(),
    name: "Color",
  },
  MENU_OPTION_3: {
    action: () => contactDeveloper(),
    name: "Contact",
  },
  MENU_OPTION_4: {
    action: () => backToMenu(),
    name: "BackToMenu",
  },
};

const FIRST_OPTION_OF_THE_LIST_ID = 1;

const SETTINGS_QUANITITY = 4;

window.addEventListener("load", () => {
  selectInitiallySelectedOption();
  makeCurrentConsoleColorInvisible();
  settingInitialAudioState();
});

document.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  const {
    up,
    upArrow,
    down,
    downArrow,
    left,
    leftArrow,
    right,
    rightArrow,
    start,
    positive,
    negative,
  } = key_codes;

  if (key === up || key === upArrow) {
    if (currentSettingsMenuOption > FIRST_OPTION_OF_THE_LIST_ID) {
      moveUpOnTheSettingsList();
    }
    if (isOnColorMenu()) {
      setFirstColorAsActive();
    } else {
      unsetColorAsActive();
      return;
    }
  }

  if (key === down || key === downArrow) {
    if (currentSettingsMenuOption < SETTINGS_QUANITITY) {
      moveDownOnTheSettingsList();
    }
    if (isOnColorMenu()) {
      setFirstColorAsActive();
    } else {
      unsetColorAsActive();
      return;
    }
  }

  if (key === left || key === leftArrow) {
    if (isOnColorMenu()) {
      moveLeftOnTheColorsList();
    }
  }

  if (key === right || key === rightArrow) {
    if (isOnColorMenu()) {
      moveRightOnTheColorsList();
    }
  }

  if (key === positive || key === start) {
    if (isOnColorMenu()) {
      changeColor();
      return;
    }
    doSelectedOption();
  }

  if (key === negative) {
    SETTINGS_OPTIONS["MENU_OPTION_4"].action();
  }
});

const selectInitiallySelectedOption = () => {
  const firstOptionOnSettingsListId = "#settings_menuOption_1";
  currentSettingsMenuOption = 1;
  const optionsToBeSelected = document.querySelector(
    firstOptionOnSettingsListId,
  ) as HTMLButtonElement;

  optionsToBeSelected.classList.add("active");
};

const moveUpOnTheSettingsList = () => {
  const firstOptionOnSettingsListId = document.querySelector(
    "#settings_menuOption_" + currentSettingsMenuOption--,
  ) as HTMLButtonElement;
  removeActiveSettingsClass(firstOptionOnSettingsListId);

  const optionsToBeSelected = document.querySelector(
    "#settings_menuOption_" + currentSettingsMenuOption,
  ) as HTMLButtonElement;
  addActiveSettingsClass(optionsToBeSelected);

  consoleInstance.audioEngine.playInspectAudio();
};

const moveDownOnTheSettingsList = () => {
  const firstOptionOnSettingsListId = document.querySelector(
    "#settings_menuOption_" + currentSettingsMenuOption++,
  ) as HTMLButtonElement;
  removeActiveSettingsClass(firstOptionOnSettingsListId);

  const optionsToBeSelected = document.querySelector(
    "#settings_menuOption_" + currentSettingsMenuOption,
  ) as HTMLButtonElement;
  addActiveSettingsClass(optionsToBeSelected);

  consoleInstance.audioEngine.playInspectAudio();
};
const moveRightOnTheColorsList = () => {
  const currentActiveColor = document.querySelector(
    ".colorBtnActive",
  ) as HTMLButtonElement;
  let nextColorOnColorList =
    currentActiveColor?.nextElementSibling as HTMLButtonElement;

  if (!nextColorOnColorList) {
    moveToTheFirstElementInTheColorsList();
    return;
  }

  if (isLastElementOfTheColorListTheCurrentConsoleColor()) {
    moveToTheFirstElementInTheColorsList();
    return;
  }

  if (isElementTheCurrentConsoleColor(nextColorOnColorList)) {
    nextColorOnColorList =
      nextColorOnColorList?.nextElementSibling as HTMLButtonElement;
  }

  unsetColorAsActive();
  setColorAsActiveByName(nextColorOnColorList.id);

  consoleInstance.audioEngine.playInspectAudio();
};

const moveLeftOnTheColorsList = () => {
  const currentActiveColor = document.querySelector(
    ".colorBtnActive",
  ) as HTMLButtonElement;

  let previousColorOnColorList =
    currentActiveColor?.previousElementSibling as HTMLButtonElement;

  if (!previousColorOnColorList) {
    moveToTheLastElementInTheColorsList();
    return;
  }

  if (isFirstElementOfTheColorListTheCurrentConsoleColor()) {
    moveToTheLastElementInTheColorsList();
    return;
  }

  if (isElementTheCurrentConsoleColor(previousColorOnColorList)) {
    previousColorOnColorList =
      previousColorOnColorList?.previousElementSibling as HTMLButtonElement;
  }

  unsetColorAsActive();
  setColorAsActiveByName(previousColorOnColorList.id);

  consoleInstance.audioEngine.playInspectAudio();
};

const moveToTheLastElementInTheColorsList = () => {
  const colorElements = document.querySelector(
    ".color_btns",
  ) as HTMLButtonElement;
  let colorToBeActive = colorElements?.lastElementChild as HTMLButtonElement;

  if (colorToBeActive.classList.contains("colorBtnCurrent")) {
    colorToBeActive =
      colorToBeActive?.previousElementSibling as HTMLButtonElement;
  }

  unsetColorAsActive();
  setColorAsActiveByName(colorToBeActive.id);

  consoleInstance.audioEngine.playInspectAudio();
};

const moveToTheFirstElementInTheColorsList = () => {
  const colorElements = document.querySelector(
    ".color_btns",
  ) as HTMLButtonElement;
  let colorToBeActive = colorElements?.firstElementChild as HTMLButtonElement;

  if (colorToBeActive.classList.contains("colorBtnCurrent")) {
    colorToBeActive = colorToBeActive?.nextElementSibling as HTMLButtonElement;
  }

  unsetColorAsActive();
  setColorAsActiveByName(colorToBeActive.id);

  consoleInstance.audioEngine.playInspectAudio();
};

const isFirstElementOfTheColorListTheCurrentConsoleColor = () => {
  const colorElements = document.querySelector(
    ".color_btns",
  ) as HTMLButtonElement;

  if (
    colorElements.firstElementChild?.classList.contains("colorBtnCurrent") &&
    colorElements.firstElementChild?.nextElementSibling?.classList.contains(
      "colorBtnActive",
    )
  ) {
    return true;
  }
  return false;
};

const isLastElementOfTheColorListTheCurrentConsoleColor = () => {
  const colorElements = document.querySelector(
    ".color_btns",
  ) as HTMLButtonElement;

  if (
    colorElements.lastElementChild?.classList.contains("colorBtnCurrent") &&
    colorElements.lastElementChild?.previousElementSibling?.classList.contains(
      "colorBtnActive",
    )
  ) {
    return true;
  }
  return false;
};

const isElementTheCurrentConsoleColor = (
  colorToBeActive: HTMLButtonElement,
) => {
  if (colorToBeActive.classList.contains("colorBtnCurrent")) {
    return true;
  }
  return false;
};

const removeActiveSettingsClass = (htmlButton: HTMLButtonElement) => {
  htmlButton.classList.remove("active");
};

const addActiveSettingsClass = (htmlButton: HTMLButtonElement) => {
  htmlButton.classList.add("active");
};

const settingInitialAudioState = () => {
  const muteImg = document.querySelector(".mute") as HTMLImageElement;

  if (consoleInstance.audioEngine.isMuted()) {
    muteImg.src = "../public/assets/mute_pixel.png";
  } else {
    muteImg.src = "../public/assets/unmute_pixel.png";
  }
};

const toggleMuteOrUnmute = () => {
  const muteImg = document.querySelector(".mute") as HTMLImageElement;

  if (consoleInstance.audioEngine.isMuted()) {
    muteImg.src = "../public/assets/unmute_pixel.png";
    consoleInstance.audioEngine.unmuteConsole();
  } else {
    muteImg.src = "../public/assets/mute_pixel.png";
    consoleInstance.audioEngine.muteConsole();
  }
};

const colorChangeOnSettings = () => {};
const contactDeveloper = () => {
  const contactDeveloper = document.querySelector(
    "#settings_menuOption_3",
  ) as HTMLAnchorElement;
  contactDeveloper.click();
};
const backToMenu = () => {
  history.back();
};

const doSelectedOption = () => {
  SETTINGS_OPTIONS[
    ("MENU_OPTION_" +
      currentSettingsMenuOption) as keyof typeof SETTINGS_OPTIONS
  ].action();
};

const makeCurrentConsoleColorInvisible = () => {
  const currentColor = localStorage.getItem("gameColor");
  const colorButton = document.querySelector("#" + currentColor);
  colorButton?.classList.remove("colorBtn");
  colorButton?.classList.add("colorBtnCurrent");
};

const setFirstColorAsActive = () => {
  const listOfColors = document.querySelectorAll(
    ".colorBtn",
  ) as NodeListOf<HTMLButtonElement>;

  listOfColors[0].classList.remove("colorBtn");
  listOfColors[0].classList.add("colorBtnActive");
};
const setColorAsActiveByName = (colorName: string) => {
  const colorToBeActive = document.querySelector(
    "#" + colorName,
  ) as HTMLButtonElement;

  colorToBeActive.classList.remove("colorBtn");
  colorToBeActive.classList.add("colorBtnActive");
};

const unsetColorAsActive = () => {
  const currentlyActiveColor = document.querySelector(
    ".colorBtnActive",
  ) as HTMLButtonElement;

  if (currentlyActiveColor) {
    currentlyActiveColor.classList.add("colorBtn");
    currentlyActiveColor.classList.remove("colorBtnActive");
  }
};

const changeColor = () => {
  const newColorButton = document.querySelector(
    ".colorBtnActive",
  ) as HTMLButtonElement;
  const newColorName = newColorButton?.id as string;

  makePreviousColorButtonVisible();
  consoleInstance.changeConsoleColor(newColorName);
  makeCurrentColorButtonInvisible();

  setFirstColorAsActive();
};

const isOnColorMenu = () => {
  if (
    SETTINGS_OPTIONS[
      ("MENU_OPTION_" +
        currentSettingsMenuOption) as keyof typeof SETTINGS_OPTIONS
    ].name === "Color"
  ) {
    return true;
  }
  return false;
};
