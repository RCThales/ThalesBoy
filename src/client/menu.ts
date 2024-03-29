import {
  GAME_LIST_LOADER,
  GAMES_LIST_CONTAINER,
} from "./html_elements_menu.js";
import { GamesList } from "./games.js";
import { Games } from "./types/games.type.js";
import { consoleInstance } from "./index.js";
import key_codes from "./key_codes.js";

let currentActiveGame: number = 1;
let currentActiveNavOption: number = 1;
let numberOfGamesAvailable: number;

const FIRST_GAME_OF_THE_LIST_ID = 1;
const FIRST_NAV_OPTION_ID = 1;
const LAST_NAV_OPTION_ID = 3;
const NO_GAME_SELECTED = 0;
const START_GAME_ANIMATION_DURATION = 3000;

let gamesList: GamesList = new GamesList();

window.addEventListener("load", async () => {
  await gamesList.fetchGamesFromCache();
  //await gamesList.fetchGamesFromApi();
  numberOfGamesAvailable = getNumberOfGames();

  substituteLoaderForGameList();
  renderListOfGames();
  selectInitiallySelectedGame();
  setAvailableGamesNumberOnHud();
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
    select,
  } = key_codes;

  if (key === up || key === upArrow) {
    if (
      currentActiveGame > FIRST_GAME_OF_THE_LIST_ID &&
      currentActiveGame !== NO_GAME_SELECTED
    ) {
      moveUpOnTheGamesList();
      return;
    } else if (currentActiveGame === NO_GAME_SELECTED) {
      return;
    } else {
      moveToNavMenuOption(FIRST_NAV_OPTION_ID);
      activateNavMenuOverlay();
    }
  }

  if (key === down || key === downArrow) {
    if (
      currentActiveGame < numberOfGamesAvailable &&
      currentActiveGame !== NO_GAME_SELECTED
    ) {
      moveDownOnTheGamesList();
      return;
    } else if (currentActiveGame === NO_GAME_SELECTED) {
      moveDownFromNavToGamesList();
      ResetGameImageToStartingPosition();
      deactivateNavMenuOverlay();
      return;
    }
    selectGameById(FIRST_GAME_OF_THE_LIST_ID);
  }

  if (key === left || key === leftArrow) {
    if (
      currentActiveGame === NO_GAME_SELECTED &&
      currentActiveNavOption !== FIRST_NAV_OPTION_ID
    ) {
      moveLeftOnTheNavMenu();
    } else if (
      currentActiveGame === NO_GAME_SELECTED &&
      currentActiveNavOption === FIRST_NAV_OPTION_ID
    ) {
      moveToLastOptionOnNavMenu();
    } else {
      return;
    }
  }

  if (key === right || key === rightArrow) {
    if (
      currentActiveGame === NO_GAME_SELECTED &&
      currentActiveNavOption !== LAST_NAV_OPTION_ID
    ) {
      moveRightOnTheNavMenu();
    } else if (
      currentActiveGame === NO_GAME_SELECTED &&
      currentActiveNavOption === LAST_NAV_OPTION_ID
    ) {
      moveToFirstOptionOnNavMenu();
    } else {
      return;
    }
  }

  if (key === start || key === positive) {
    if (currentActiveGame !== NO_GAME_SELECTED) {
      startGame();
      return;
    }
    startNavMenuOption();
  }

  if (key === select) {
    moveToNavMenuOption(LAST_NAV_OPTION_ID);
    activateNavMenuOverlay();
  }
});

const selectInitiallySelectedGame = () => {
  const firstGameOnGamesListId = "#game_1";
  currentActiveGame = 1;
  const gameToBeSelected = document.querySelector(
    firstGameOnGamesListId,
  ) as HTMLButtonElement;
  gameToBeSelected.classList.add("active");
  changeGameImage(currentActiveGame);
};

const selectFirstGameOfTheList = () => {
  selectInitiallySelectedGame();
  consoleInstance.audioEngine.playInspectAudio();
};

const selectGameById = (gameId: number) => {
  const previouslySelectedGame = document.querySelector(
    "#game_" + currentActiveGame,
  ) as HTMLButtonElement;
  removeActiveGameClass(previouslySelectedGame);

  currentActiveGame = gameId;

  const gameToBeSelected = document.querySelector(
    "#game_" + gameId,
  ) as HTMLButtonElement;

  gameToBeSelected.classList.add("active");
  changeGameImage(currentActiveGame);
  consoleInstance.audioEngine.playInspectAudio();
};

const moveUpOnTheGamesList = () => {
  const previouslySelectedGame = document.querySelector(
    "#game_" + currentActiveGame--,
  ) as HTMLButtonElement;
  removeActiveGameClass(previouslySelectedGame);

  const gameToBeSelected = document.querySelector(
    "#game_" + currentActiveGame,
  ) as HTMLButtonElement;
  addActiveGameClass(gameToBeSelected);
  changeGameImage(currentActiveGame);
  consoleInstance.audioEngine.playInspectAudio();
};

const moveDownOnTheGamesList = () => {
  const previouslySelectedGame = document.querySelector(
    "#game_" + currentActiveGame++,
  ) as HTMLButtonElement;
  removeActiveGameClass(previouslySelectedGame);

  const gameToBeSelected = document.querySelector(
    "#game_" + currentActiveGame,
  ) as HTMLButtonElement;
  addActiveGameClass(gameToBeSelected);
  changeGameImage(currentActiveGame);
  consoleInstance.audioEngine.playInspectAudio();
};

const moveToNavMenuOption = (navOption: number) => {
  const previouslySelectedGame = document.querySelector(
    "#game_" + currentActiveGame,
  ) as HTMLButtonElement;
  removeActiveGameClass(previouslySelectedGame);

  currentActiveGame = NO_GAME_SELECTED;
  currentActiveNavOption = navOption;

  const NavOptionToBeSelected = document.querySelector(
    "#menuOption_" + navOption,
  ) as HTMLAnchorElement;
  addActiveNavMenueClass(NavOptionToBeSelected);

  changeGameImageToNavOption();
  consoleInstance.audioEngine.playInspectAudio();
};

const moveRightOnTheNavMenu = () => {
  const previouslySelectedNavOption = document.querySelector(
    "#menuOption_" + currentActiveNavOption++,
  ) as HTMLAnchorElement;
  removeActiveNavMenuClass(previouslySelectedNavOption);

  const NavOptionToBeSelected = document.querySelector(
    "#menuOption_" + currentActiveNavOption,
  ) as HTMLAnchorElement;
  addActiveNavMenueClass(NavOptionToBeSelected);

  consoleInstance.audioEngine.playInspectAudio();

  changeGameImageToNavOption();
};

const moveLeftOnTheNavMenu = () => {
  const previouslySelectedNavOption = document.querySelector(
    "#menuOption_" + currentActiveNavOption--,
  ) as HTMLAnchorElement;
  removeActiveNavMenuClass(previouslySelectedNavOption);

  const NavOptionToBeSelected = document.querySelector(
    "#menuOption_" + currentActiveNavOption,
  ) as HTMLAnchorElement;
  addActiveNavMenueClass(NavOptionToBeSelected);

  consoleInstance.audioEngine.playInspectAudio();

  changeGameImageToNavOption();
};

const moveToFirstOptionOnNavMenu = () => {
  const previouslySelectedNavOption = document.querySelector(
    "#menuOption_" + LAST_NAV_OPTION_ID,
  ) as HTMLAnchorElement;
  removeActiveNavMenuClass(previouslySelectedNavOption);

  currentActiveNavOption = FIRST_NAV_OPTION_ID;

  const NavOptionToBeSelected = document.querySelector(
    "#menuOption_" + FIRST_NAV_OPTION_ID,
  ) as HTMLAnchorElement;
  addActiveNavMenueClass(NavOptionToBeSelected);

  consoleInstance.audioEngine.playInspectAudio();

  changeGameImageToNavOption();
};

const moveToLastOptionOnNavMenu = () => {
  const previouslySelectedNavOption = document.querySelector(
    "#menuOption_" + FIRST_NAV_OPTION_ID,
  ) as HTMLAnchorElement;
  removeActiveNavMenuClass(previouslySelectedNavOption);

  currentActiveNavOption = LAST_NAV_OPTION_ID;

  const NavOptionToBeSelected = document.querySelector(
    "#menuOption_" + LAST_NAV_OPTION_ID,
  ) as HTMLAnchorElement;
  addActiveNavMenueClass(NavOptionToBeSelected);

  consoleInstance.audioEngine.playInspectAudio();

  changeGameImageToNavOption();
};

const moveDownFromNavToGamesList = () => {
  const NavOptionToBeSelected = document.querySelector(
    "#menuOption_" + currentActiveNavOption,
  ) as HTMLAnchorElement;
  removeActiveNavMenuClass(NavOptionToBeSelected);
  currentActiveNavOption = 0;
  selectFirstGameOfTheList();
};

const removeActiveGameClass = (htmlButton: HTMLButtonElement) => {
  htmlButton.classList.remove("active");
};

const addActiveGameClass = (htmlButton: HTMLButtonElement) => {
  htmlButton.classList.add("active");
};

const removeActiveNavMenuClass = (NavOption: HTMLAnchorElement) => {
  const navMenuWrapper = document.querySelector(".navMenu") as HTMLDivElement;
  navMenuWrapper.classList.remove("navMenuActive");
  NavOption.classList.remove("navMenuItemActive");
};

const addActiveNavMenueClass = (NavOption: HTMLAnchorElement) => {
  const navMenuWrapper = document.querySelector(".navMenu") as HTMLDivElement;
  navMenuWrapper.classList.add("navMenuActive");
  NavOption.classList.add("navMenuItemActive");
};

const changeGameImage = (imageId: number) => {
  const gameNameElement = document.querySelector(
    ".selectedGameImageText",
  ) as HTMLElement;
  const selectedGameImageElements = document.querySelectorAll(
    ".gameImage",
  ) as NodeListOf<HTMLImageElement>;

  const selectedGameName = gamesList.games[imageId - 1].name;
  const selectedGameImage = gamesList.games[imageId - 1].imageUrl;

  selectedGameImageElements.forEach((element: HTMLImageElement) => {
    element.src = selectedGameImage;
  });
  gameNameElement.textContent = selectedGameName;
};

const ResetGameImageToStartingPosition = () => {
  const selectedMenuOptionElement = document.querySelector(
    "#selectedGameImage",
  ) as HTMLImageElement;

  selectedMenuOptionElement.style.transform = "translate(-25px, 0px)";
};

const changeGameImageToNavOption = () => {
  const selectedMenuOptionElement = document.querySelector(
    "#selectedGameImage",
  ) as HTMLImageElement;

  const selectedNavOptionImage = `../../public/assets/navOption_${currentActiveNavOption}.png`;
  selectedMenuOptionElement.src = selectedNavOptionImage;
  selectedMenuOptionElement.style.transform = "translate(-100px, 10px)";
};

const getNumberOfGames = (): number => {
  return gamesList.games.length;
};

const activateNavMenuOverlay = () => {
  const overlay = document.querySelector(".navMenuOverlay") as HTMLDivElement;
  overlay.style.opacity = "0.9";
};

const deactivateNavMenuOverlay = () => {
  const overlay = document.querySelector(".navMenuOverlay") as HTMLDivElement;
  overlay.style.opacity = "0";
};

const setAvailableGamesNumberOnHud = () => {
  const availableGamesText = document.querySelector(
    ".availableGamesNumber",
  ) as HTMLSpanElement;
  const availableGames = getNumberOfGames().toString();
  availableGamesText.textContent = availableGames;
};

const renderListOfGames = async () => {
  createListOfHtmlGameButtons(gamesList.games);
};

const createListOfHtmlGameButtons = (games: Games[]) => {
  games.forEach((game) => {
    let gameListButton = document.createElement("button");
    gameListButton.className = "game";
    gameListButton.id = `game_${game.id}`;
    gameListButton.textContent = game.name;
    GAMES_LIST_CONTAINER.append(gameListButton);
  });
};

const substituteLoaderForGameList = () => {
  GAME_LIST_LOADER.style.display = "none";
  GAMES_LIST_CONTAINER.style.display = "flex";
};

const startGame = () => {
  const currentGameIndexOnGamesList = currentActiveGame - 1;
  const gameUrl = gamesList.games[currentGameIndexOnGamesList].gameUrl;
  consoleInstance.audioEngine.playStartGameAudio();

  setTimeout(() => {
    consoleInstance.startSelectedGame(gameUrl);
  }, START_GAME_ANIMATION_DURATION);

  animateGameStart();
};

const startNavMenuOption = () => {
  const selectedNavMenuOptionAnchorElement = document.querySelector(
    "#menuOption_" + currentActiveNavOption,
  ) as HTMLAnchorElement;

  selectedNavMenuOptionAnchorElement.click();
};

const animateGameStart = () => {
  const container = document.querySelector(".container") as HTMLElement;
  container.style.display = "none";

  const gameTransitionImage = document.querySelector(
    ".gameTransition",
  ) as HTMLElement;
  const gameTransitionScreen = document.querySelector(
    ".gameTransitionWrapper",
  ) as HTMLElement;
  gameTransitionScreen.style.display = "flex";
  gameTransitionImage.style.transform = "scale(1.2)";
};
