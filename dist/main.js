"use strict";
window.addEventListener('load', () => {
    //Avoiding the transition when the page is loaded or reloaded
    const gameBody = document.getElementById('gameBody');
});
const getStartColor = () => {
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
    //Changin the video game color on start
    changeColor(currentColor);
    //Avoiding the transition when the page is loaded or reloaded
    const gameBody = document.getElementById('gameBody');
    gameBody.style.transition = '0s ease all';
    const brand = document.getElementById('brand');
    brand.style.transition = '0s ease all';
};
const changeColor = (color) => {
    const yellow = document.getElementById('yellow');
    const blue = document.getElementById('blue');
    const pink = document.getElementById('pink');
    const purple = document.getElementById('purple');
    const green = document.getElementById('green');
    const gameBody = document.getElementById('gameBody');
    gameBody.style.transition = '1s ease all';
    const brand = document.getElementById('brand');
    brand.style.transition = '0.5s ease all';
    const colors = {
        yellow: { id: yellow, primary: '#f8b725', accent: '#fcbe2b', carving: '#e1b245' },
        blue: { id: blue, primary: '#008199', accent: '#24C6E3', carving: '#00687A' },
        pink: { id: pink, primary: '#e74254', accent: '#E3243B', carving: '#B83544' },
        purple: { id: purple, primary: '#6d2fdc', accent: '#6A24E3', carving: '#5A26B5' },
        green: { id: green, primary: '#79be01', accent: '#9DE324', carving: '#619902' }
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
