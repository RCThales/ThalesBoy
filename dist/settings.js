"use strict";
let settingsInspectSound = new Audio('./audio/inspect.wav');
settingsInspectSound.volume = 0.3;
let keyRepeatedSettings = true;
let currentOption = 1;
let isMuted = false;
window.addEventListener('load', () => {
    selectOption(1, true);
    if (getMutedSettings() === 'true') {
        isMuted = false;
        muteOrUnmuteAudio();
        return;
    }
    isMuted = true;
    muteOrUnmuteAudio();
});
const getMutedSettings = () => {
    if (localStorage.getItem('isMuted') !== null) {
        return localStorage.getItem('isMuted');
    }
    return 'false';
};
document.addEventListener('keyup', (keyPressed) => {
    keyRepeatedSettings = true;
});
document.addEventListener('keydown', (keyPressed) => {
    if (keyRepeatedSettings) {
        if (keyPressed.key === 'Enter' || keyPressed.key.toLowerCase() === 'k') {
            settingsInspectSound.currentTime = 0;
            settingsInspectSound.play();
            goToSettingsLink(currentOption);
        }
        selectSettingsMenuViaInput(keyPressed);
        keyRepeatedSettings = false;
    }
});
const muteOrUnmuteAudio = () => {
    if (isMuted) {
        localStorage.setItem('isMuted', 'false');
        changeMuteIcon(false);
        settingsInspectSound.muted = false;
        isMuted = false;
        return;
    }
    localStorage.setItem('isMuted', 'true');
    changeMuteIcon(true);
    settingsInspectSound.muted = true;
    isMuted = true;
};
const changeMuteIcon = (isMuted) => {
    const muteOption = document.querySelector('.mute');
    if (isMuted) {
        muteOption === null || muteOption === void 0 ? void 0 : muteOption.classList.remove('fa-volume-up');
        muteOption === null || muteOption === void 0 ? void 0 : muteOption.classList.add('fa-volume-off');
        muteOption.style.color = '#de3232';
        muteOption.style.marginRight = '12px';
        return;
    }
    muteOption === null || muteOption === void 0 ? void 0 : muteOption.classList.add('fa-volume-up');
    muteOption === null || muteOption === void 0 ? void 0 : muteOption.classList.remove('fa-volume-off');
    muteOption.style.color = 'white';
    muteOption.style.marginRight = '0px';
};
const selectSettingsMenuViaInput = (keyPressed) => {
    //if (document.activeElement === searchInput) return
    const movement = {
        W: currentOption - 1,
        w: currentOption - 1,
        S: currentOption + 1,
        s: currentOption + 1,
        ArrowUp: currentOption - 1,
        ArrowDown: currentOption + 1,
    };
    //Checking whether the user is on the game list, or on the nav menu
    if (movement[keyPressed.key] !== undefined) {
        selectOption(movement[keyPressed.key], false);
    }
};
const goToSettingsLink = (currentOption) => {
    if (currentOption === 1)
        muteOrUnmuteAudio();
    else if (currentOption === 2) {
        window.location.href = 'mailto:canadathales@gmail.com';
        return;
    }
    else {
        window.location.href = '../menu.html';
    }
};
const selectOption = (optionId, isStartup) => {
    //Current Game Array
    const fullListOfOptions = document.querySelectorAll('.menuOption');
    //Cleaning game selection
    fullListOfOptions.forEach(element => {
        element.classList.remove("activeOption");
    });
    //Reversing selected game to the opposite extreme of the list if the selected game is first or last.
    if (optionId === 0)
        optionId = 3;
    if (optionId > fullListOfOptions.length)
        optionId = 1;
    const theSelectedOption = document.getElementById(optionId.toString());
    theSelectedOption.classList.add("activeOption");
    currentOption = optionId;
    //changeOptionIcon(optionId)
    if (!isStartup) {
        settingsInspectSound.currentTime = 0;
        settingsInspectSound.play();
    }
};
