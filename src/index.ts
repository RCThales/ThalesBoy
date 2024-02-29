import {
  CONSOLE_SCREEN,
  GIF_CONTAINER,
  POWER_BTN_DESKTOP,
  POWER_BTN_MOBILE,
  MUSICAL_NOTES,
  THEME_BUTTON,
  WHOLE_PAGE_CONTAINER,
} from "./clickable_elements.js";

import { colors, currentConsoleColor } from "./console_colors.js";

export let isConsoleOn = false;

class ConsoleAudio {
  private consoleOnAudio = new Audio("../src/audio/thalesboyOn.mp3");
  private powerButonAudio = new Audio("../src/audio/toggleSound.mp3");

  public playConsoleOnAudio = () => {
    this.playPowerButtonAudio();
    this.playConsoleIntroAudio();
  };

  public playConsoleOffAudio = () => {
    this.playPowerButtonAudio();
  };

  private playPowerButtonAudio = () => {
    this.powerButonAudio.play();
    setTimeout(() => {
      this.powerButonAudio.currentTime = 0;
    }, 1000);
  };

  private playConsoleIntroAudio = () => {
    this.consoleOnAudio.play();
    setTimeout(() => {
      this.consoleOnAudio.currentTime = 0;
    }, 1000);
  };

  public muteConsole = () => {
    this.consoleOnAudio.muted = true;
    this.powerButonAudio.muted = true;
  };

  public unmuteConsole = () => {
    this.consoleOnAudio.muted = false;
    this.powerButonAudio.muted = false;
  };

  public setConsoleVolume = (volume = 1) => {
    this.consoleOnAudio.volume = volume;
    this.powerButonAudio.volume = volume;
  };
}

const audioManager = new ConsoleAudio();

onselectstart = (e) => {
  e.preventDefault();
};

window.addEventListener("load", () => {
  loadSplashScreen();
  setThemeOnStartup();
  setConsoleColorOnStartUp();
  setGeneralAudioState();
});

window.addEventListener("click", () => {
  CONSOLE_SCREEN?.focus();
});

const loadSplashScreen = () => {
  const COOLDOWN_FOR_MAIN_PAGE_TO_APPEAR = 500;
  const SPLASH_SCREEN_DURATION = 1500;
  const splashScreen = document.querySelector("#splash") as HTMLElement;
  const wholePageContainerContainer = document.querySelector(
    ".container",
  ) as HTMLElement;
  setTimeout(() => {
    wholePageContainerContainer.style.display = "flex";
  }, COOLDOWN_FOR_MAIN_PAGE_TO_APPEAR);
  setTimeout(() => {
    splashScreen.style.display = "none";
  }, SPLASH_SCREEN_DURATION);
};

const setConsoleColorOnStartUp = () => {
  if (localStorage.getItem("gameColor") === null) {
    setDefaultConsoleColorAsYellow();
    return;
  }
  changeConsoleColor(currentConsoleColor);
  disableColorTransitionAnimation();
};

const setDefaultConsoleColorAsYellow = () => {
  localStorage.setItem("gameColor", "yellow");
  colors.YELLOW_BUTTON.style.display = "none";
  return;
};
const disableColorTransitionAnimation = () => {
  const gameBody = document.getElementById("gameBody") as HTMLButtonElement;
  gameBody.style.transition = "background 0s";

  const brand = document.getElementById("brand") as HTMLElement;
  brand.style.transition = "background 0s";
};

const setThemeOnStartup = () => {
  const themeSelectedByUser = localStorage.getItem("theme");

  if (themeSelectedByUser === "night") {
    setThemeAsNight(THEME_BUTTON, WHOLE_PAGE_CONTAINER);
  } else if (themeSelectedByUser === "day") {
    setThemeAsDay(THEME_BUTTON, WHOLE_PAGE_CONTAINER);
  } else {
    setThemeAsUserBrowserDefault(THEME_BUTTON, WHOLE_PAGE_CONTAINER);
  }
};

export const changeTheme = () => {
  const themeSelectedByUser = localStorage.getItem("theme");

  if (themeSelectedByUser === "night") {
    setThemeAsDay(THEME_BUTTON, WHOLE_PAGE_CONTAINER);
  } else if (themeSelectedByUser === "day") {
    setThemeAsNight(THEME_BUTTON, WHOLE_PAGE_CONTAINER);
  }
};

export const setThemeAsNight = (
  themeSelectingButton: HTMLButtonElement,
  wholePageContainer: HTMLElement,
) => {
  themeSelectingButton.textContent = "🌞";
  localStorage.setItem("theme", "night");
  wholePageContainer.style.background = "var(--darkAccent)";
};

export const setThemeAsDay = (
  themeSelectingButton: HTMLButtonElement,
  wholePageContainer: HTMLElement,
) => {
  themeSelectingButton.textContent = "🌚";
  wholePageContainer.style.background = "var(--secondary)";
  localStorage.setItem("theme", "day");
};

const setThemeAsUserBrowserDefault = (
  themeSelectingButton: HTMLButtonElement,
  wholePageContainer: HTMLElement,
) => {
  if (window.matchMedia("(prefers-color-scheme: light)").matches) {
    setThemeAsDay(themeSelectingButton, wholePageContainer);
  } else {
    setThemeAsNight(themeSelectingButton, wholePageContainer);
  }
};

const setGeneralAudioState = () => {
  const isAudioMutedInLocalStorage = localStorage.getItem("isMuted");

  if (isAudioMutedInLocalStorage) {
    audioManager.muteConsole();
  } else {
    setInitialAudioVolumes();
    audioManager.unmuteConsole();
  }
};

const setInitialAudioVolumes = () => {
  const INITIAL_VOLUME = 0.3;
  audioManager.setConsoleVolume(INITIAL_VOLUME);
};

export const selectTheme = () => {
  const container = document.querySelector(".container") as HTMLElement;
  const button = document.querySelector(".themeBtn") as HTMLButtonElement;
  const theme = localStorage.getItem("theme");

  //Night Mode
  if (theme === "night") {
    button.textContent = "🌚";
    container.style.background = "var(--secondary)";
    localStorage.setItem("theme", "day");
    return;
  }

  //Day Mode
  button.textContent = "🌞";
  localStorage.setItem("theme", "night");
  container.style.background = "var(--darkAccent)";
};

export const changeConsoleColor = (colorName: string) => {
  const colorClicked = colorName;

  animateColorChangeTransition();
  makeCurrentColorButtonVisible();

  updateCssColorsToChosenConsoleColor(colorClicked);
  localStorage.setItem("gameColor", colorClicked);

  makeCurrentColorButtonInvisible();
};

const updateCssColorsToChosenConsoleColor = (colorClicked: string) => {
  document.documentElement.style.setProperty(
    "--primary",
    colors[colorClicked].primary,
  );
  document.documentElement.style.setProperty(
    "--accent",
    colors[colorClicked].accent,
  );
  document.documentElement.style.setProperty(
    "--carving",
    colors[colorClicked].carving,
  );
};

const animateColorChangeTransition = () => {
  //Adding the transition for the coloring effect
  const gameBody = document.getElementById("gameBody") as HTMLButtonElement;
  gameBody.style.transition = "background 1s ease";
  const brand = document.getElementById("brand") as HTMLElement;
  brand.style.transition = "background 0.5s ease";
};

const makeCurrentColorButtonVisible = () => {
  let currentColor = localStorage.getItem("gameColor");
  let currentColorButton = colors[currentColor as keyof typeof colors];
  currentColorButton.buttonElement.style.display = "flex";
};

const makeCurrentColorButtonInvisible = () => {
  let currentColor = localStorage.getItem("gameColor");
  let currentColorButton = colors[currentColor as keyof typeof colors];
  currentColorButton.buttonElement.style.display = "none";
};

export const turnConsoleOn = () => {
  const MENU_URL = "../menu.html";
  const INTRO_GIF_DURATION = 4;
  const MENU_PAGE_LOAD_DELAY = 3.5;
  isConsoleOn = true;
  turnConsoleLedOn();
  playConsoleIntroGif(INTRO_GIF_DURATION);
  movePowerButtonToOnPosition();
  turnOnScreen(MENU_URL, MENU_PAGE_LOAD_DELAY);
  setAnimatedHelperTextOff();
  setAudioOnAnimationOn();
  audioManager.playConsoleOnAudio();
};

export const turnConsoleOff = () => {
  isConsoleOn = false;
  turnConsoleLedOff();
  movePowerButtonToOffPosition();
  turnOffScreen();
  setAnimatedHelperTextOn();
  setAudioOnAnimationOff();
  audioManager.playConsoleOffAudio();
};

const playConsoleIntroGif = (durationInSeconds: number) => {
  const gif = getGif();
  const durationInMiliseconds = durationInSeconds * 1000;

  GIF_CONTAINER.style.display = "block";
  GIF_CONTAINER.append(gif);

  destroyGifAfterDelay(gif, durationInMiliseconds);
};

const getGif = () => {
  const gif = document.createElement("img") as HTMLImageElement;
  gif.src = "../src/assets/thalesboygif.gif";
  gif.className = "gameIntro";
  return gif;
};

const destroyGifAfterDelay = (
  gif: HTMLImageElement,
  durationInMiliseconds: number,
) => {
  const stopGifAfterDurationIsElapsed = setTimeout(() => {
    GIF_CONTAINER.style.display = "none";
    gif.src = "";
    clearTimeout(stopGifAfterDurationIsElapsed);
  }, durationInMiliseconds);
};

const setAudioOnAnimationOn = () => {
  MUSICAL_NOTES.forEach((musicalNote) => {
    musicalNote.classList.remove("soundOff");
  });
};

const setAudioOnAnimationOff = () => {
  MUSICAL_NOTES.forEach((musicalNote) => {
    musicalNote.classList.add("soundOff");
  });
};

const movePowerButtonToOnPosition = () => {
  POWER_BTN_DESKTOP.style.transform = "translateY(-15px)";
  POWER_BTN_DESKTOP.style.pointerEvents = "none";

  POWER_BTN_MOBILE.style.transform = "translateX(130px)";
  POWER_BTN_MOBILE.style.color = "red";
  POWER_BTN_MOBILE.style.pointerEvents = "none";

  setTimeout(() => {
    POWER_BTN_DESKTOP.style.pointerEvents = "auto";
    POWER_BTN_MOBILE.style.pointerEvents = "auto";
  }, 4100);
};

const movePowerButtonToOffPosition = () => {
  POWER_BTN_DESKTOP.style.transform = "translateY(0px)";

  POWER_BTN_MOBILE.style.transform = "translateX(0px)";
  POWER_BTN_MOBILE.style.color = "var(--darkAccent)";
};

const turnOnScreen = (htmlPageUrl: string, delay = 0) => {
  const delayInMiliseconds = delay * 1000;
  setTimeout(() => {
    CONSOLE_SCREEN.src = htmlPageUrl;
  }, delayInMiliseconds);
};

const turnOffScreen = () => {
  CONSOLE_SCREEN.src = "";
};

const turnConsoleLedOn = () => {
  const led = document.querySelector(".led");
  led?.classList.add("on");
};

const turnConsoleLedOff = () => {
  const led = document.querySelector(".led");
  led?.classList.remove("on");
};

const setAnimatedHelperTextOn = () => {
  let allElementsOnHelperText = document.querySelectorAll("#powerText > *");

  //Animated text instruction for the power button appear
  allElementsOnHelperText.forEach((e: any) => {
    e.style.display = "block";
  });
};

const setAnimatedHelperTextOff = () => {
  let allElementsOnHelperText = document.querySelectorAll("#powerText > *");

  //Animated text instruction for the power button appear
  allElementsOnHelperText.forEach((e: any) => {
    e.style.display = "none";
  });
};

const dispacthClickEventsToConsoleScreenIFrame = (key: string) => {
  CONSOLE_SCREEN.contentDocument?.dispatchEvent(
    new KeyboardEvent("keydown", { key }),
  );
  CONSOLE_SCREEN.contentDocument?.dispatchEvent(
    new KeyboardEvent("keyup", { key }),
  );
};
