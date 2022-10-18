"use strict";
window.addEventListener('load', (event) => {
    if (localStorage.getItem('startColor') !== null) {
        localStorage.setItem('startColor', 'yellow');
    }
});
