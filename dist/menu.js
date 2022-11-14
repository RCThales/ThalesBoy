"use strict";
let gamesArray = [{
        name: 'Snake',
        id: 1,
    },
    {
        name: 'Crazy Surfer',
        id: 2,
    },
    {
        name: 'Cool Game',
        id: 3,
    }];
let currentGame = 1;
let isGameStarting = false;
const searchInput = document.querySelector('#search');
let startGameAudio = new Audio('./audio/startgame.wav');
let gameInspectSound = new Audio('./audio/inspect.wav');
window.addEventListener('load', () => {
    renderListOfGames(gamesArray);
    selectGame(1, true);
    getNumberOfGames();
});
const getNumberOfGames = () => {
    const availableGames = document.querySelector('.availableGamesNumber');
    availableGames.textContent = gamesArray.length.toString();
};
document.addEventListener('keydown', (keyPressed) => {
    if (keyPressed.key === 'Enter' || keyPressed.key === 'k') {
        startGame();
        return;
    }
    selectMenuViaInput(keyPressed);
});
const selectMenuViaInput = (keyPressed) => {
    //if (document.activeElement === searchInput) return
    if (isGameStarting)
        return;
    const listOfGames = document.querySelectorAll('.games');
    const movement = {
        W: currentGame - 1,
        w: currentGame - 1,
        S: currentGame + 1,
        s: currentGame + 1,
        ArrowUp: currentGame - 1,
        ArrowDown: currentGame + 1,
    };
    if (movement[keyPressed.key] !== undefined) {
        selectGame(movement[keyPressed.key], false);
    }
};
const renderListOfGames = (array) => {
    let gameList = document.querySelector('.gameList');
    gameList.textContent = '';
    let counter = 1;
    array.forEach((element) => {
        let gameListButton = document.createElement('button');
        gameListButton.className = 'game';
        gameListButton.id = `${counter++}`;
        gameListButton.textContent = element.name;
        gameListButton.onclick = function () { selectGame(parseInt(gameListButton.id), false); };
        gameList.appendChild(gameListButton);
    });
};
const startGame = () => {
    isGameStarting = true;
    startGameAudio.play();
    setTimeout(() => {
        window.location.href = `./games/game_${currentGame}/game_${currentGame}.html`;
    }, 3000);
    animateGameStart();
};
const animateGameStart = () => {
    const container = document.querySelector(".container");
    container.style.display = 'none'; //Start Effect
    const gameTransitionScreen = document.querySelector('.gameTransitionWrapper');
    gameTransitionScreen.style.transform = 'scale(1.2)';
};
const selectGame = (gameId, isStartup) => {
    //Current Game Array
    const fullListOfGames = document.querySelectorAll('.game');
    //Reversing selected game to the opposite extreme of the list if the selected game is first or last.
    if (gameId === 0)
        gameId = fullListOfGames.length;
    if (gameId > fullListOfGames.length)
        gameId = 1;
    const theSelectedGame = document.getElementById(gameId.toString());
    fullListOfGames.forEach(element => {
        element.classList.remove("activeGame");
    });
    theSelectedGame.classList.add("activeGame");
    currentGame = gameId;
    changeGameImage(gameId);
    if (!isStartup) {
        gameInspectSound.currentTime = 0;
        gameInspectSound.play();
    }
};
const changeGameImage = (imageId) => {
    const gameText = document.querySelector('.selectedGameImageText');
    const gameImg = document.querySelector('.selectedGameImage');
    const gameImgBg = document.querySelector('.selectedGameImageBg');
    const gameImgTransition = document.querySelector('.selectedGameImageTransition');
    if (gameImg.src = `./img/game_${imageId}.png`) {
        gameImg.src = `./img/game_${imageId}.png`;
        gameImgBg.src = `./img/game_${imageId}.png`;
        gameImgTransition.src = `./img/game_${imageId}.png`;
        //Getting name of the selected game.
        gamesArray.forEach((e) => {
            if (imageId === e.id)
                gameText.textContent = e.name;
        });
        return;
    }
    gameImg.src = `./img/game_1.png`;
    gameImgBg.src = `./img/game_1.png`;
    gameImgTransition.src = `./img/game_1.png`;
    gameText.textContent = `Snake`;
};
searchInput === null || searchInput === void 0 ? void 0 : searchInput.addEventListener('input', () => {
    filterGames(gamesArray);
});
const filterGames = (array) => {
    const filteredArray = array.filter(game => {
        const gameName = game.name.toLowerCase();
        const inputValue = searchInput === null || searchInput === void 0 ? void 0 : searchInput.value.toLowerCase();
        return gameName.includes(inputValue);
    });
    renderListOfGames(filteredArray);
};
