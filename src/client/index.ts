import {
  CONSOLE_SCREEN,
  THEME_BUTTON,
  WHOLE_PAGE_CONTAINER,
} from "./clickable_elements.js";

window.addEventListener("load", async () => {
  loadSplashScreen();
  setActiveThemeOnStartup();
});

window.addEventListener("click", () => {
  CONSOLE_SCREEN?.focus();
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
