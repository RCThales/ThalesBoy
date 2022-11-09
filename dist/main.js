"use strict";
let audio = new Audio('../audio/thalesboyOn.mp3');
let introOff = () => { };
onselectstart = (e) => {
    e.preventDefault();
};
window.addEventListener('load', () => {
    //Splash Screen
    const splash = document.getElementById('splash');
    setTimeout(function () { splash.style.display = 'none'; }, 1500);
    //Setting Color mode on startup
    if (localStorage.getItem('theme') === null) {
        localStorage.setItem('theme', 'day');
    }
    themeOnStartup();
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
//Making sure focus is always on the game, so the controllers work.
window.addEventListener('click', () => {
    var _a;
    const screen = document.querySelector('.screen');
    (_a = screen === null || screen === void 0 ? void 0 : screen.contentWindow) === null || _a === void 0 ? void 0 : _a.focus();
});
const themeOnStartup = () => {
    const container = document.querySelector('.container');
    const button = document.querySelector('.themeBtn');
    const theme = localStorage.getItem('theme');
    //Night Mode
    if (theme === 'day') {
        button.textContent = '🌚';
        container.style.background = 'var(--secondary)';
        localStorage.setItem('theme', 'day');
        return;
    }
    //Day Mode
    button.textContent = '🌞';
    localStorage.setItem('theme', 'night');
    container.style.background = 'var(--darkAccent)';
};
const selectTheme = () => {
    const container = document.querySelector('.container');
    const button = document.querySelector('.themeBtn');
    const theme = localStorage.getItem('theme');
    //Night Mode
    if (theme === 'night') {
        button.textContent = '🌚';
        container.style.background = 'var(--secondary)';
        localStorage.setItem('theme', 'day');
        return;
    }
    //Day Mode
    button.textContent = '🌞';
    localStorage.setItem('theme', 'night');
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
const gamePowerOnAndOff = () => {
    //turnLedOnOrOff() returns true if game is on and false if it is off.
    //ANCHOR GAME ON
    if (turnLedOnOrOff()) {
        movePowerButton(true);
        playGif(true);
        redirectScreenToGameWebPage(true);
        toggleAnimatedHelperText(true);
        playGameAudioAnimation(true);
        return;
    }
    //ANCHOR GAME OFF
    movePowerButton(false);
    playGif(false);
    redirectScreenToGameWebPage(false);
    toggleAnimatedHelperText(false);
    playGameAudioAnimation(false);
};
const playGameAudioAnimation = (on) => {
    const audioAnimation = document.querySelectorAll('.musicalNotes');
    if (on) {
        audioAnimation.forEach(element => {
            element.classList.remove('soundOff');
        });
        return;
    }
    audioAnimation.forEach(element => {
        element.classList.add('soundOff');
    });
};
const movePowerButton = (on) => {
    const audio = new Audio('../audio/toggleSound.mp3');
    const btn = document.getElementById('powerBtn');
    const btnMobile = document.getElementById('powerBtnMobile');
    if (on) {
        //Button movement
        audio.play();
        btn.style.transform = 'translateY(-15px)';
        btnMobile.style.transform = 'translateX(130px)';
        btnMobile.style.color = 'red';
        btn.style.pointerEvents = 'none';
        btnMobile.style.pointerEvents = 'none';
        setTimeout(() => {
            btn.style.pointerEvents = 'auto';
            btnMobile.style.pointerEvents = 'auto';
        }, 4100);
        return;
    }
    audio.play();
    btn.style.transform = 'translateY(0px)';
    btnMobile.style.transform = 'translateX(0px)';
    btnMobile.style.color = 'var(--darkAccent)';
};
const playGif = (on) => {
    const screenIntro = document.querySelector('.screenIntro');
    screenIntro.style.display = 'block';
    const gif = document.createElement('img');
    if (on) {
        //Intro Audio Effect
        audio.play();
        //Creating gif every time the game is on so the gif can play once from the start
        gif.src = '../img/thalesboygif.gif';
        gif.className = 'gameIntro';
        screenIntro.append(gif);
        //End of the animation
        introOff = setTimeout(() => {
            gif.remove();
            screenIntro.style.display = 'none';
        }, 4000);
        return;
    }
    window.clearTimeout(introOff);
    screenIntro.style.display = 'none';
    audio.pause();
    audio.currentTime = 0;
};
const redirectScreenToGameWebPage = (on) => {
    const screen = document.querySelector('.screen');
    if (on) {
        //Opening game system link by shutting screen on
        setTimeout(() => {
            screen.src = 'https://tgs1.netlify.app/';
        }, 3000);
        return;
    }
    //Shutting screen off
    screen.src = '';
};
const turnLedOnOrOff = () => {
    const led = document.querySelector('.led');
    led === null || led === void 0 ? void 0 : led.classList.toggle('on');
    if (led === null || led === void 0 ? void 0 : led.classList.contains('on'))
        return true;
    return false;
};
const toggleAnimatedHelperText = (on) => {
    let toggle = document.querySelectorAll('#powerText > *');
    if (on) {
        //Animated text instruction for the power button disappear
        toggle.forEach((e) => {
            e.style.display = 'none';
        });
        return;
    }
    //Animated text instruction for the power button appear
    toggle.forEach((e) => {
        e.style.display = 'block';
    });
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
