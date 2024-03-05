import Console from "./console.js";
import {
  GAME_LIST_LOADER,
  GAMES_LIST_CONTAINER,
} from "./html_elements_menu.js";
import { GamesList } from "./games.js";
import { Games } from "./types/games.type.js";

let currentActiveGame: number = 1;
let currentActiveNavOption: number = 1;
let numberOfGamesAvailable: number;

const FIRST_GAME_OF_THE_LIST_ID = 1;
const FIRST_NAV_OPTION_ID = 1;
const LAST_NAV_OPTION_ID = 4;
const NO_GAME_SELECTED = 0;

let gamesList: GamesList = new GamesList();
const consoleInstance: Console = new Console();

window.addEventListener("load", async () => {
  await gamesList.fetchGamesFromCache();
  numberOfGamesAvailable = getNumberOfGames();

  substituteLoaderForGameList();
  renderListOfGames();
  selectInitiallySelectedGame();
  setAvailableGamesNumberOnHud();
});

document.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();

  if (key === "w" || key === "arrowup") {
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

  if (key === "s" || key === "arrowdown") {
    if (
      currentActiveGame < numberOfGamesAvailable &&
      currentActiveGame !== NO_GAME_SELECTED
    ) {
      moveDownOnTheGamesList();
      return;
    } else if (currentActiveGame === NO_GAME_SELECTED) {
      moveDownFromNavToGamesList();
      deactivateNavMenuOverlay();
      return;
    }
    selectGameById(FIRST_GAME_OF_THE_LIST_ID);
  }
  // LEFT button (ThalesBoy)
  if (key === "a" || key === "arrowleft") {
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
  // RIGHT button (ThalesBoy)
  if (key === "d" || key === "arrowright") {
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
  // START button (ThalesBoy)
  if (key === "enter" || key === "k") {
    if (currentActiveGame !== NO_GAME_SELECTED) {
      startGame();
      return;
    }
    startNavMenuOption();
  }
  // SELECT button (ThalesBoy)
  if (key === "shift") {
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
  gameToBeSelected.classList.add("activeGame");
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

  gameToBeSelected.classList.add("activeGame");
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
  htmlButton.classList.remove("activeGame");
};

const addActiveGameClass = (htmlButton: HTMLButtonElement) => {
  htmlButton.classList.add("activeGame");
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

  ResetGameImageToStartingPosition();
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
  selectedMenuOptionElement.style.transform = "translate(-95px, 10px)";
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
  }, 3000);

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
  container.style.display = "none"; //Start Effect
  const gameTransitionScreen = document.querySelector(
    ".gameTransitionWrapper",
  ) as HTMLElement;

  gameTransitionScreen.style.transform = "scale(1.2)";
};
