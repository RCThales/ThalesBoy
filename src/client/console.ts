import ConsoleAudio from "./audios.js";
import {
  CONSOLE_BODY,
  CONSOLE_SCREEN,
  GIF_CONTAINER,
  HIREME_TEXT,
  MUSICAL_NOTES,
  POWER_BTN_DESKTOP,
  POWER_BTN_MOBILE,
  YELLOW_BUTTON,
} from "./clickable_elements.js";
import { colors } from "./console_colors.js";
import {
  makeStartingColorButtonInvisible,
  setClickHereTextOn,
  setClickHereTextOff,
} from "./index.js";
import { ColorLib } from "./types/games.type.js";

class Console {
  static instance: Console | null = null;
  public isConsoleOn = false;
  public currentConsoleColor = localStorage.getItem("gameColor") as string;
  private INITIAL_VOLUME = 0.3;
  public audioEngine = new ConsoleAudio();

  constructor() {
    this.audioEngine.setConsoleVolume(this.INITIAL_VOLUME);
    if (Console.instance) {
      return Console.instance;
    }
    Console.instance = this;
  }

  public turnConsoleOn = () => {
    const MENU_URL = "../menu.html";
    const INTRO_GIF_DURATION = 4;
    const MENU_PAGE_LOAD_DELAY = 3.5;
    this.isConsoleOn = true;
    this.turnConsoleLedOn();
    this.playConsoleIntroGif(INTRO_GIF_DURATION);
    this.movePowerButtonToOnPosition();
    this.turnOnScreen(MENU_URL, MENU_PAGE_LOAD_DELAY);
    this.setAudioOnAnimationOn();
    setClickHereTextOff();
    this.audioEngine.playConsoleOnAudio();
  };

  public turnConsoleOff = () => {
    this.isConsoleOn = false;
    this.turnConsoleLedOff();
    this.movePowerButtonToOffPosition();
    this.turnOffScreen();
    this.setAudioOnAnimationOff();
    setClickHereTextOn();

    this.audioEngine.playConsoleOffAudio();
  };

  private playConsoleIntroGif = (durationInSeconds: number) => {
    const gif = this.getGif();
    const durationInMiliseconds = durationInSeconds * 1000;

    GIF_CONTAINER.style.display = "block";
    GIF_CONTAINER.append(gif);

    this.destroyGifAfterDelay(gif, durationInMiliseconds);
  };

  private getGif = () => {
    const gif = document.createElement("img") as HTMLImageElement;
    gif.src = "../public/assets/thalesboygif.gif";
    gif.className = "gameIntro";
    return gif;
  };

  private destroyGifAfterDelay = (
    gif: HTMLImageElement,
    durationInMiliseconds: number,
  ) => {
    const stopGifAfterDurationIsElapsed = setTimeout(() => {
      GIF_CONTAINER.style.display = "none";
      gif.remove();
      clearTimeout(stopGifAfterDurationIsElapsed);
    }, durationInMiliseconds);
  };

  private setAudioOnAnimationOn = () => {
    MUSICAL_NOTES.forEach((musicalNote) => {
      musicalNote.classList.remove("soundOff");
    });
  };

  private setAudioOnAnimationOff = () => {
    MUSICAL_NOTES.forEach((musicalNote) => {
      musicalNote.classList.add("soundOff");
    });
  };

  private movePowerButtonToOnPosition = () => {
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

  private movePowerButtonToOffPosition = () => {
    POWER_BTN_DESKTOP.style.transform = "translateY(0px)";

    POWER_BTN_MOBILE.style.transform = "translateX(0px)";
    POWER_BTN_MOBILE.style.color = "var(--darkAccent)";
  };

  private turnOnScreen = (htmlPageUrl: string, delay = 0) => {
    const delayInMiliseconds = delay * 1000;
    setTimeout(() => {
      CONSOLE_SCREEN.src = htmlPageUrl;
    }, delayInMiliseconds);
  };

  private turnOffScreen = () => {
    CONSOLE_SCREEN.src = "";
  };

  private turnConsoleLedOn = () => {
    const led = document.querySelector(".led");
    led?.classList.add("on");
  };

  private turnConsoleLedOff = () => {
    const led = document.querySelector(".led");
    led?.classList.remove("on");
  };

  public setConsoleColorOnStartUp = () => {
    if (localStorage.getItem("gameColor") === null) {
      this.setDefaultConsoleColorAsYellow();
      return;
    }
    this.changeConsoleColor(this.currentConsoleColor);
    this.disableColorTransitionAnimation();
    makeStartingColorButtonInvisible();
  };

  private setDefaultConsoleColorAsYellow = () => {
    localStorage.setItem("gameColor", "yellow");
    YELLOW_BUTTON.style.display = "none";
    return;
  };

  public changeConsoleColor = (colorName: string) => {
    const colorClicked = colorName;

    this.animateColorChangeTransition();
    this.updateCssColorsToChosenConsoleColor(colorClicked);
    localStorage.setItem("gameColor", colorClicked);
  };

  private updateCssColorsToChosenConsoleColor = (colorClicked: string) => {
    document.documentElement.style.setProperty(
      "--primary",
      colors[colorClicked as keyof ColorLib].primary,
    );
    document.documentElement.style.setProperty(
      "--accent",
      colors[colorClicked as keyof ColorLib].accent,
    );
    document.documentElement.style.setProperty(
      "--carving",
      colors[colorClicked as keyof ColorLib].carving,
    );
  };

  private animateColorChangeTransition = () => {
    CONSOLE_BODY.style.transition = "background 1s ease";
    HIREME_TEXT.style.transition = "background 0.5s ease";
  };

  private disableColorTransitionAnimation = () => {
    CONSOLE_BODY.style.transition = "background 0s";
    HIREME_TEXT.style.transition = "background 0s";
  };

  public dispacthClickEventsToConsoleScreenIFrame = (key: string) => {
    CONSOLE_SCREEN.contentWindow?.window.postMessage({ keycode: key }, "*");
    CONSOLE_SCREEN.contentDocument?.dispatchEvent(
      new KeyboardEvent("keydown", { key }),
    );
    CONSOLE_SCREEN.contentDocument?.dispatchEvent(
      new KeyboardEvent("keyup", { key }),
    );
  };

  public startSelectedGame = (gameUrl: string) => {
    const parentIframe = window.parent.document.querySelector(
      ".screen",
    ) as HTMLIFrameElement;
    parentIframe.src = gameUrl;
  };
}

export default Console;
