import {
  makeCurrentColorButtonInvisible,
  makePreviousColorButtonVisible,
} from "./index.js";

import { consoleInstance } from "./index.js";

let currentSettingsMenuOption = 1;

const SETTINGS_OPTIONS = {
  1: {
    action: () => toggleMuteOrUnmute(),
    name: "Mute",
  },
  2: {
    action: () => colorChangeOnSettings(),
    name: "Color",
  },
  3: {
    action: () => contactDeveloper(),
    name: "Contact",
  },
  4: {
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

  if (key === "w" || key === "arrowup") {
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

  if (key === "s" || key === "arrowdown") {
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
  // LEFT button (ThalesBoy)
  if (key === "a" || key === "arrowleft") {
    if (isOnColorMenu()) {
      moveLeftOnTheColorsList();
    }
  }
  // RIGHT button (ThalesBoy)
  if (key === "d" || key === "arrowright") {
    if (isOnColorMenu()) {
      moveRightOnTheColorsList();
    }
  }
  // START button (ThalesBoy)
  if (key === "enter" || key === "k") {
    if (isOnColorMenu()) {
      changeColor();
      return;
    }
    doSelectedOption();
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
  let colorToBeActive =
    currentActiveColor?.nextElementSibling as HTMLButtonElement;

  if (colorToBeActive.classList.contains("colorBtnCurrent")) {
    colorToBeActive = colorToBeActive?.nextElementSibling as HTMLButtonElement;
  }

  unsetColorAsActive();
  setColorAsActiveByName(colorToBeActive.id);

  consoleInstance.audioEngine.playInspectAudio();
};

const moveLeftOnTheColorsList = () => {
  const currentActiveColor = document.querySelector(
    ".colorBtnActive",
  ) as HTMLButtonElement;
  let colorToBeActive =
    currentActiveColor?.previousElementSibling as HTMLButtonElement;

  if (colorToBeActive.classList.contains("colorBtnCurrent")) {
    colorToBeActive =
      colorToBeActive?.previousElementSibling as HTMLButtonElement;
  }

  unsetColorAsActive();
  setColorAsActiveByName(colorToBeActive.id);

  consoleInstance.audioEngine.playInspectAudio();
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
    currentSettingsMenuOption as keyof typeof SETTINGS_OPTIONS
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
    SETTINGS_OPTIONS[currentSettingsMenuOption as keyof typeof SETTINGS_OPTIONS]
      .name === "Color"
  ) {
    return true;
  }
  return false;
};
