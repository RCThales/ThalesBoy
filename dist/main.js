"use strict";
//Variables
let gameIsOn = false;
let gameIsPaused = false;
let timer;
let onSound = new Audio('../audio/thalesboyOn.mp3');
window.addEventListener('load', () => {
    const screen = document.querySelector('canvas');
    const screenFrame = document.getElementById('screenFrame');
    //Resizing the Canvas
    screen.width = screenFrame.offsetWidth - 150;
    screen.height = screenFrame.offsetWidth - 150;
});
window.addEventListener('resize', () => {
    const screen = document.querySelector('canvas');
    const screenFrame = document.getElementById('screenFrame');
    screen.width = screenFrame.offsetWidth - 150;
    screen.height = screenFrame.offsetWidth - 150;
});
//Toggle the videogame on and off
const gameOnAndOff = () => {
    if (document.readyState === 'complete') {
        const light = document.getElementById('led');
        const screen = document.getElementById('screen');
        if (light !== null && screen !== null) {
            //If videogame is on
            if (light.classList.contains('on')) {
                screen.style.backgroundColor = 'rgb(105, 116, 99)';
                light.style.backgroundColor = 'rgb(34, 34, 34)';
                light.classList.remove('on');
                gameIsOn = false;
                switchGameOff();
            }
            //If videogame is off
            else {
                screen.style.backgroundColor = 'rgb(208, 228, 197)';
                light.style.backgroundColor = 'red';
                light.classList.add('on');
                gameIsOn = true;
                switchGameOn();
            }
        }
    }
};
//What happens when videogame is on
const switchGameOn = () => {
    if (document.readyState === 'complete') {
        const screen = document.getElementById('screen');
        const context = screen === null || screen === void 0 ? void 0 : screen.getContext('2d');
        /*Video game intro*/
        screen.style.backgroundImage = '';
        screen.style.backgroundImage = 'url(../img/thalesboygif.gif)';
        timer = setTimeout(() => screen.style.backgroundImage = 'repeating-linear-gradient(85deg, rgba(129, 175, 129, 0.25), rgba(144, 201, 152, 0.25) 1px, transparent 0px, transparent 2px)', 5000);
        /*AUDIO ON*/
        onSound.loop = false;
        onSound.volume = 0.5;
        onSound.play();
    }
};
//What happens when videogame is off
const switchGameOff = () => {
    if (document.readyState === 'complete') {
        const screen = document.getElementById('screen');
        const context = screen === null || screen === void 0 ? void 0 : screen.getContext('2d');
        context === null || context === void 0 ? void 0 : context.clearRect(0, 0, screen.width, screen.height);
        onSound.pause();
        onSound.currentTime = 0;
        screen.style.backgroundImage = 'repeating-linear-gradient(85deg, rgba(129, 175, 129, 0.25), rgba(144, 201, 152, 0.25) 1px, transparent 0px, transparent 2px)';
        clearTimeout(timer);
    }
};
//What happens when videogame is off
const pauseGame = () => {
    if (document.readyState === 'complete') {
        const pauseBtn = document.getElementById('pause');
        if (pauseBtn !== null) {
            if (!gameIsPaused) {
                pauseBtn.innerHTML = "play_arrow";
                gameIsPaused = true;
            }
            else {
                pauseBtn.innerHTML = "pause";
                gameIsPaused = false;
            }
        }
    }
};
