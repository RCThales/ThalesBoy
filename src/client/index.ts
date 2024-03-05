import {
  CONSOLE_SCREEN,
  THEME_BUTTON,
  WHOLE_PAGE_CONTAINER,
} from "./html_elements_index.js";

window.addEventListener("load", async () => {
  loadSplashScreen();
  setActiveThemeOnStartup();
});

window.addEventListener("click", (event) => {
  const htmlElementOfEvent = event?.target as HTMLElement;
  if (htmlElementOfEvent.tagName !== "INPUT") {
    CONSOLE_SCREEN?.focus();
  }
});

const loadSplashScreen = () => {
  const COOLDOWN_FOR_MAIN_PAGE_TO_APPEAR_IN_MILISECONDS = 500;
  makeSplashScreenAppearWithDelay(
    COOLDOWN_FOR_MAIN_PAGE_TO_APPEAR_IN_MILISECONDS,
  );

  const SPLASH_SCREEN_DURATION_IN_MILISECONDS = 1500;
  makeSplashScreenDisappearWithDelay(SPLASH_SCREEN_DURATION_IN_MILISECONDS);
};

const makeSplashScreenAppearWithDelay = (delay: number) => {
  setTimeout(() => {
    WHOLE_PAGE_CONTAINER.style.display = "flex";
  }, delay);
};

const makeSplashScreenDisappearWithDelay = (delay: number) => {
  const splashScreen = document.querySelector("#splash") as HTMLElement;
  setTimeout(() => {
    splashScreen.style.display = "none";
  }, delay);
};

const setActiveThemeOnStartup = () => {
  const themeSelectedByUser = localStorage.getItem("theme");

  if (themeSelectedByUser === "night") {
    setThemeAsNight();
  } else if (themeSelectedByUser === "day") {
    setThemeAsDay();
  } else {
    setThemeAsUserBrowserDefault();
  }
};

export const setThemeAsNight = () => {
  localStorage.setItem("theme", "night");
  const SUN_EMOJI = "🌞";
  THEME_BUTTON.textContent = SUN_EMOJI || "🌞";
  WHOLE_PAGE_CONTAINER.style.background = "var(--night)";
};

export const setThemeAsDay = () => {
  localStorage.setItem("theme", "day");
  const MOON_EMOJI = "🌚";
  THEME_BUTTON.textContent = MOON_EMOJI || "🌚";
  WHOLE_PAGE_CONTAINER.style.background = "var(--day)";
};

const setThemeAsUserBrowserDefault = () => {
  if (window.matchMedia("(prefers-color-scheme: light)").matches) {
    setThemeAsDay();
  } else {
    setThemeAsNight();
  }
};

export const toggleBetweenDayAndNightTheme = () => {
  const currentActiveTheme = localStorage.getItem("theme");

  if (currentActiveTheme === "night") {
    setThemeAsDay();
  } else if (currentActiveTheme === "day") {
    setThemeAsNight();
  }
};

export const makePreviousColorButtonVisible = () => {
  getCurrentColorButton().style.display = "flex";
};

export const makeCurrentColorButtonInvisible = (button: HTMLButtonElement) => {
  button.style.display = "none";
};

export const makeStartingColorButtonInvisible = () => {
  getCurrentColorButton().style.display = "none";
};

const getCurrentColorButton = () => {
  const colorName = localStorage.getItem("gameColor") as string;
  const colorButton = document.getElementById(colorName) as HTMLButtonElement;
  return colorButton;
};

export const setClickHereTextOn = () => {
  getClickHereTextElement().style.display = "flex";
};

export const setClickHereTextOff = () => {
  getClickHereTextElement().style.display = "none";
};

const getClickHereTextElement = () => {
  return document.querySelector("#powerText") as HTMLSpanElement;
};

export const openAddGameModal = () => {
  const addGameModal = document.querySelector(
    ".addGameModalWrapper",
  ) as HTMLElement;
  addGameModal.style.display = "flex";
};

export const closeAddGameModal = () => {
  console.log("test");
  const addGameModal = document.querySelector(
    ".addGameModalWrapper",
  ) as HTMLElement;
  addGameModal.style.display = "none";
};

export const addGameToApi = () => {
  const gameName = getGameNameFromInput();
  const gameUrl = getGameUrlFromInput();
  if (!isValidUrl(gameUrl)) {
    alert("This URL is either invalid or it is not using the HTTPS protocol");
    return;
  }

  //DO STUF
};

const getGameNameFromInput = (): string => {
  const inputElement = document.querySelector("#game_name") as HTMLInputElement;
  return inputElement ? inputElement.value : "";
};

const getGameUrlFromInput = (): string => {
  const inputElement = document.querySelector("#game_url") as HTMLInputElement;
  return inputElement ? inputElement.value : "";
};

const isValidUrl = (urlString: string) => {
  var urlPattern = new RegExp(
    "^(https:\\/\\/)" + // https protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,})" + // domain name
      "(\\/[-a-z\\d%_.~+]*)*" + // path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$", // fragment locator
    "i",
  );
  return urlPattern.test(urlString);
};
