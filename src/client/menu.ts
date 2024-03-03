import Console from "./console.js";
import { GAMES_LIST, GAME_LIST_LOADER } from "./clickable_elements.js";
import { GamesList } from "./games.js";
import { Games } from "./types/games.type.js";

let navLinkArray = {
  1: "https://github.com/RCThales/",
  2: "https://www.instagram.com/thalescardris/",
  3: "https://www.linkedin.com/in/thalesrodriguescardoso/",
  4: "../settings.html",
};
const consoleInstance = new Console();

let currentGame = 1;
let currentMenuOption = 1;
let isGameStarting = false;
let keyRepeated = true;

let onMenu = false;
let onGameList = true;

const searchInput = document.querySelector("#search") as HTMLInputElement;

let startGameAudio = new Audio("../public/audio/startgame.wav");
let gameInspectSound = new Audio("../public/audio/inspect.wav");
let gamesList: GamesList = new GamesList();

window.addEventListener("load", async () => {
  await gamesList.fetchGames();
  substituteLoaderForGameList();
  renderListOfGames();
  selectGame(1, true);
  getNumberOfGames();

  startGameAudio.volume = 0.3;
  gameInspectSound.volume = 0.3;

  localStorage.getItem("isMuted");

  if (getMutedMenu() === "true") {
    startGameAudio.muted = true;
    gameInspectSound.muted = true;
    return;
  }

  startGameAudio.muted = false;
  gameInspectSound.muted = false;
});

const getMutedMenu = () => {
  if (localStorage.getItem("isMuted") !== null) {
    return localStorage.getItem("isMuted");
  }
  return "false";
};

const getNumberOfGames = () => {
  return gamesList.games.length;
};

document.addEventListener("keydown", (keyPressed) => {
  if (keyRepeated) {
    if (keyPressed.key === "Enter" || keyPressed.key.toLowerCase() === "k") {
      if (onGameList) startGame();
      if (onMenu) goToLink();
      return;
    }
    selectMenuViaInput(keyPressed);
    keyRepeated = false;
  }
});

document.addEventListener("keyup", (keyPressed) => {
  keyRepeated = true;
});

const selectMenuViaInput = (keyPressed: KeyboardEvent) => {
  //if (document.activeElement === searchInput) return
  if (isGameStarting) return;

  const movement = {
    W: (currentGame - 1) as number,
    w: (currentGame - 1) as number,
    S: (currentGame + 1) as number,
    s: (currentGame + 1) as number,
    ArrowUp: (currentGame - 1) as number,
    ArrowDown: (currentGame + 1) as number,
    D: 0,
    d: 0,
    A: 0,
    a: 0,
    ArrowRight: 0,
    ArrowLeft: 0,
  };

  const movementMenu = {
    D: (currentMenuOption + 1) as number,
    d: (currentMenuOption + 1) as number,
    A: (currentMenuOption - 1) as number,
    a: (currentMenuOption - 1) as number,
    ArrowRight: (currentMenuOption + 1) as number,
    ArrowLeft: (currentMenuOption - 1) as number,
    S: 10,
    s: 10,
    ArrowDown: 10,
  };

  //Checking whether the user is on the game list, or on the nav menu
  if (movement[keyPressed.key as keyof typeof movement] !== undefined) {
    //Game List
    if (onGameList) {
      selectGame(movement[keyPressed.key as keyof typeof movement], false);
      return;
    }

    //Nav Menu
    if (
      movementMenu[keyPressed.key as keyof typeof movementMenu] !== undefined
    ) {
      selectNavOption(
        movementMenu[keyPressed.key as keyof typeof movementMenu],
      );
    }
  }
};

const renderListOfGames = async () => {
  createListOfHtmlGameButtons(gamesList.games);
};

const createListOfHtmlGameButtons = (games: Games[]) => {
  games.forEach((game) => {
    let gameListButton = document.createElement("button");
    gameListButton.className = "game";
    gameListButton.id = `${game.id}`;
    gameListButton.textContent = game.name;
    gameListButton.onclick = function () {
      selectGame(parseInt(gameListButton.id), false);
    };
    GAMES_LIST.append(gameListButton);
  });
};

const substituteLoaderForGameList = () => {
  GAME_LIST_LOADER.style.display = "none";
  GAMES_LIST.style.display = "flex";
};

const startGame = () => {
  isGameStarting = true;

  startGameAudio.play();
  let gameUrl = gamesList.games[currentGame - 1].gameUrl;

  setTimeout(() => {
    consoleInstance.startSelectedGame(gameUrl);
  }, 3000);

  animateGameStart();
};

const animateGameStart = () => {
  const container = document.querySelector(".container") as HTMLElement;
  container.style.display = "none"; //Start Effect
  const gameTransitionScreen = document.querySelector(
    ".gameTransitionWrapper",
  ) as HTMLElement;

  gameTransitionScreen.style.transform = "scale(1.2)";
};

const selectNavOption = (menuOption: number) => {
  onMenu = true;
  onGameList = false;

  const listOfNavOptions = document.querySelectorAll(".menuOption");
  const navMenu = document.querySelector(".navMenu") as HTMLElement;
  navMenu.classList.add("navMenuActive");

  if (menuOption === 0) menuOption = 4;
  if (menuOption === 5) menuOption = 1;

  //Cleaning nav selection
  listOfNavOptions.forEach((element) => {
    element.classList.remove("navMenuItemActive");
  });

  //Heading back to the game selection menu
  if (menuOption === 10) {
    navMenu.classList.remove("navMenuActive");
    selectGame(1, false);
    return;
  }

  currentMenuOption = menuOption;

  const selectedOption = document.querySelector(
    `.menuOption${menuOption}`,
  ) as HTMLElement;
  selectedOption.classList.add("navMenuItemActive");

  gameInspectSound.currentTime = 0;
  gameInspectSound.play();
};

const goToLink = () => {
  let counter = 0;
  const listOfNavOptions = document.querySelectorAll(".menuOption");
  listOfNavOptions.forEach((element) => {
    counter++;
    if (element.classList.contains("navMenuItemActive")) {
      if (counter != 4) {
        parent.window.open(
          navLinkArray[counter as keyof typeof navLinkArray],
          "_blank",
        );
        return;
      }
      window.location.href = navLinkArray[counter as keyof typeof navLinkArray];
    }
  });
};

const selectGame = (gameId: number, isStartup: boolean) => {
  onMenu = false;
  onGameList = true;

  //Current Game Array
  const fullListOfGames = document.querySelectorAll(".game");

  //Cleaning game selection
  fullListOfGames.forEach((element) => {
    element.classList.remove("activeGame");
  });

  //Going to the navigation menu
  if (gameId === 0) {
    selectNavOption(1);

    return;
  }

  //Reversing selected game to the opposite extreme of the list if the selected game is first or last.
  if (gameId > fullListOfGames.length) gameId = 1;

  const theSelectedGame = document.getElementById(
    gameId.toString(),
  ) as HTMLElement;

  theSelectedGame.classList.add("activeGame");
  currentGame = gameId;

  changeGameImage(gameId);

  if (!isStartup) {
    gameInspectSound.currentTime = 0;
    gameInspectSound.play();
  }
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
