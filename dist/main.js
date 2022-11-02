"use strict";
let audio = new Audio('../audio/thalesboyOn.mp3');
onselectstart = (e) => {
    e.preventDefault();
};
window.addEventListener('load', () => {
    let myScreenOrientation = window.screen.orientation;
    myScreenOrientation.lock("portrait");
    //Splash Screen
    const splash = document.getElementById('splash');
    setTimeout(function () { splash.style.display = 'none'; }, 1900);
    //Setting Color mode on startup
    if (localStorage.getItem('colorMode') === null) {
        localStorage.setItem('colorMode', 'day');
    }
    colorModeStartup();
    //Colors
    const yellow = document.getElementById('yellow');
    const blue = document.getElementById('blue');
    const pink = document.getElementById('pink');
    const purple = document.getElementById('purple');
    const green = document.getElementById('green');
    if (localStorage.getItem('gameColor') === null) {
        localStorage.setItem('gameColor', 'yellow');
        yellow.style.display = 'none';
        return;
    }
    const colors = {
        yellow: yellow,
        blue: blue,
        pink: pink,
        purple: purple,
        green: green
    };
    const currentColor = localStorage.getItem('gameColor');
    //Hiding the selected color button
    colors[currentColor].style.display = 'none';
    //Changing the video game color on start
    changeColor(currentColor);
    //Avoiding the transition when the page is loaded or reloaded
    const gameBody = document.getElementById('gameBody');
    gameBody.style.transition = 'background 0s';
    const brand = document.getElementById('brand');
    brand.style.transition = 'background 0s';
});
const colorModeStartup = () => {
    const container = document.querySelector('.container');
    const button = document.querySelector('.nightMode');
    const colorMode = localStorage.getItem('colorMode');
    //Night Mode
    if (colorMode === 'day') {
        button.textContent = '🌚';
        container.style.background = 'var(--secondary)';
        localStorage.setItem('colorMode', 'day');
        return;
    }
    //Day Mode
    button.textContent = '🌞';
    localStorage.setItem('colorMode', 'night');
    container.style.background = 'var(--darkAccent)';
};
const colorMode = () => {
    const container = document.querySelector('.container');
    const button = document.querySelector('.nightMode');
    const colorMode = localStorage.getItem('colorMode');
    //Night Mode
    if (colorMode === 'night') {
        button.textContent = '🌚';
        container.style.background = 'var(--secondary)';
        localStorage.setItem('colorMode', 'day');
        return;
    }
    //Day Mode
    button.textContent = '🌞';
    localStorage.setItem('colorMode', 'night');
    container.style.background = 'var(--darkAccent)';
};
const changeColor = (color) => {
    const yellow = document.getElementById('yellow');
    const blue = document.getElementById('blue');
    const pink = document.getElementById('pink');
    const purple = document.getElementById('purple');
    const green = document.getElementById('green');
    //Adding the transition for the coloring effect
    const gameBody = document.getElementById('gameBody');
    gameBody.style.transition = 'background 1s ease';
    const brand = document.getElementById('brand');
    brand.style.transition = 'background 0.5s ease';
    const colors = {
        yellow: { id: yellow, primary: '#f8b725', accent: '#fcbe2b', carving: '#e1b245' },
        blue: { id: blue, primary: '#008199', accent: '#0089A1', carving: '#00687A' },
        pink: { id: pink, primary: '#e74254', accent: '#F7485C', carving: '#B83544' },
        purple: { id: purple, primary: '#6d2fdc', accent: '#6A24E3', carving: '#5A26B5' },
        green: { id: green, primary: '#79be01', accent: '#80C902', carving: '#619902' }
    };
    //Managing buttons
    let currentColor = localStorage.getItem('gameColor');
    let currentColorButton = colors[currentColor];
    currentColorButton.id.style.display = 'flex';
    //Managin game coloring
    const colorObj = colors[color];
    document.documentElement.style.setProperty('--primary', colorObj.primary);
    document.documentElement.style.setProperty('--accent', colorObj.accent);
    document.documentElement.style.setProperty('--carving', colorObj.carving);
    //Saving selected color to LocalStorage
    localStorage.setItem('gameColor', color);
    currentColor = localStorage.getItem('gameColor');
    currentColorButton = colors[currentColor];
    //Animation trigger
    currentColorButton.id.style.display = 'none';
};
const gamePower = () => {
    const screen = document.querySelector('.screen');
    const led = document.querySelector('.led');
    led === null || led === void 0 ? void 0 : led.classList.toggle('on');
    const btn = document.getElementById('powerBtn');
    const btnMobile = document.getElementById('powerBtnMobile');
    let toggle = document.querySelectorAll('#powerText > *');
    console.log(toggle);
    //Check if game is on or off
    const isOn = (led === null || led === void 0 ? void 0 : led.classList.contains('on')) ? true : false;
    if (isOn) {
        //Button movement
        btn.style.transform = 'translateY(15px)';
        btnMobile.style.transform = 'translateX(130px)';
        btnMobile.style.color = 'red';
        toggle.forEach((e) => {
            e.style.display = 'none';
        });
        screen.src = 'https://tgs1.netlify.app/';
        audio.play();
        return;
    }
    toggle.forEach((e) => {
        e.style.display = 'block';
    });
    btn.style.transform = 'translateY(0px)';
    btnMobile.style.transform = 'translateX(0px)';
    btnMobile.style.color = 'var(--darkAccent)';
    audio.pause();
    audio.currentTime = 0;
    screen.src = '';
};
//Swipe color change function
let touchstartX = 0;
let touchendX = 0;
let fingerCount = 0;
const checkDirection = () => {
    const currentColor = localStorage.getItem('gameColor');
    const colors = ['yellow',
        'blue',
        'pink',
        'purple',
        'green'];
    const index = colors.indexOf(currentColor);
    const distance = 50;
    //left
    if (touchendX < touchstartX && (touchstartX - touchendX) > distance) {
        if (index === 4) {
            changeColor(colors[0]);
            return;
        }
        changeColor(colors[index + 1]);
    }
    //right
    if (touchendX > touchstartX && (touchendX - touchstartX) > distance) {
        if (index === 0) {
            changeColor(colors[4]);
            return;
        }
        changeColor(colors[index - 1]);
    }
};
const gameBody = document.querySelector('.gameBody');
gameBody.addEventListener('touchstart', e => {
    fingerCount = e.touches.length;
    touchstartX = e.changedTouches[0].clientX;
});
gameBody.addEventListener('touchend', e => {
    touchendX = e.changedTouches[0].clientX;
    if (fingerCount === 1) {
        checkDirection();
    }
});
