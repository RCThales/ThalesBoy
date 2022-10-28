"use strict";
window.addEventListener('load', () => {
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
    const led = document.querySelector('.led');
    led === null || led === void 0 ? void 0 : led.classList.toggle('on');
    const btn = document.getElementById('powerBtn');
    //Check if game is on or off
    const isOn = (led === null || led === void 0 ? void 0 : led.classList.contains('on')) ? true : false;
    if (isOn) {
        btn.style.transform = 'translateY(15px)';
        return;
    }
    btn.style.transform = 'translateY(-15px)';
};
