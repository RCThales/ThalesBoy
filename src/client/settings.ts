import Console from "./console.js";

let settingsInspectSound = new Audio("./audio/inspect.wav");
settingsInspectSound.volume = 0.3;

let keyRepeatedSettings = true;
let currentOption = 1;

let isMuted = false;

window.addEventListener("load", () => {
  selectOption(1, true);

  if (getMutedSettings() === "true") {
    isMuted = false;
    muteOrUnmuteAudio();
    return;
  }
  isMuted = true;
  muteOrUnmuteAudio();
});

const consoleInstance = new Console();
window.addEventListener("load", () => {
  consoleInstance.setConsoleColorOnStartUp();
});

const getMutedSettings = () => {
  if (localStorage.getItem("isMuted") !== null) {
    return localStorage.getItem("isMuted");
  }
  return "false";
};

document.addEventListener("keyup", (keyPressed) => {
  keyRepeatedSettings = true;
});

document.addEventListener("keydown", (keyPressed) => {
  if (keyRepeatedSettings) {
    if (keyPressed.key === "Enter" || keyPressed.key.toLowerCase() === "k") {
      consoleInstance.audioEngine.playInspectAudio();
      goToSettingsLink(currentOption);
    }
    selectSettingsMenuViaInput(keyPressed);

    keyRepeatedSettings = false;
  }
});

const muteOrUnmuteAudio = () => {
  if (isMuted) {
    localStorage.setItem("isMuted", "false");
    changeMuteIcon(false);
    settingsInspectSound.muted = false;
    isMuted = false;
    return;
  }
  localStorage.setItem("isMuted", "true");
  changeMuteIcon(true);
  settingsInspectSound.muted = true;
  isMuted = true;
};

const changeMuteIcon = (isMuted: boolean) => {
  const muteOption = document.querySelector(".mute") as HTMLElement;

  if (isMuted) {
    muteOption?.classList.remove("fa-volume-up");
    muteOption?.classList.add("fa-volume-off");
    muteOption.style.color = "#de3232";
    muteOption.style.marginRight = "12px";
    return;
  }
  muteOption?.classList.add("fa-volume-up");
  muteOption?.classList.remove("fa-volume-off");
  muteOption.style.color = "white";
  muteOption.style.marginRight = "0px";
};

const selectSettingsMenuViaInput = (keyPressed: KeyboardEvent) => {
  //if (document.activeElement === searchInput) return

  const movement = {
    W: (currentOption - 1) as number,
    w: (currentOption - 1) as number,
    S: (currentOption + 1) as number,
    s: (currentOption + 1) as number,
    ArrowUp: (currentOption - 1) as number,
    ArrowDown: (currentOption + 1) as number,
  };

  //Checking whether the user is on the game list, or on the nav menu
  if (movement[keyPressed.key as keyof typeof movement] !== undefined) {
    selectOption(movement[keyPressed.key as keyof typeof movement], false);
  }
};

const goToSettingsLink = (currentOption: number) => {
  if (currentOption === 1) muteOrUnmuteAudio();
  else if (currentOption === 2) {
    window.location.href = "mailto:canadathales@gmail.com";
    return;
  } else {
    window.location.href = "../menu.html";
  }
};

const selectOption = (optionId: number, isStartup: boolean) => {
  //Current Game Array
  const fullListOfOptions = document.querySelectorAll(".menuOption");

  //Cleaning game selection
  fullListOfOptions.forEach((element) => {
    element.classList.remove("activeOption");
  });

  //Reversing selected game to the opposite extreme of the list if the selected game is first or last.
  if (optionId === 0) optionId = 3;
  if (optionId > fullListOfOptions.length) optionId = 1;

  const theSelectedOption = document.getElementById(
    optionId.toString(),
  ) as HTMLElement;

  theSelectedOption.classList.add("activeOption");
  currentOption = optionId;

  //changeOptionIcon(optionId)

  if (!isStartup) {
    settingsInspectSound.currentTime = 0;
    settingsInspectSound.play();
  }
};
