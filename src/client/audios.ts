class ConsoleAudio {
  public static instance: ConsoleAudio | null = null;
  private consoleOnAudio = new Audio("../public/audio/consoleOnAudio.mp3");
  private powerButonAudio = new Audio("../public/audio/powerButtonAudio.mp3");
  private settingsInspectAudio = new Audio("../public/audio/inspect.wav");
  private startGameAudio = new Audio("../public/audio/startgame.wav");
  constructor() {
    if (ConsoleAudio.instance) {
      return ConsoleAudio.instance;
    }
    ConsoleAudio.instance = this;
  }

  public playConsoleOnAudio = () => {
    this.playPowerButtonAudio();
    this.playConsoleIntroAudio();
  };

  public playConsoleOffAudio = () => {
    this.playPowerButtonAudio();
  };

  public playInspectAudio = () => {
    this.settingsInspectAudio.currentTime = 0;
    this.settingsInspectAudio.play();
  };

  public playStartGameAudio = () => {
    this.startGameAudio.currentTime = 0;
    this.startGameAudio.play();
  };

  private playPowerButtonAudio = () => {
    this.powerButonAudio.currentTime = 0;
    this.powerButonAudio.play();
  };

  private playConsoleIntroAudio = () => {
    this.consoleOnAudio.currentTime = 0;
    this.consoleOnAudio.play();
  };

  public muteConsole = () => {
    localStorage.setItem("mute", "true");
    this.consoleOnAudio.muted = true;
    this.powerButonAudio.muted = true;
    this.settingsInspectAudio.muted = true;
    this.startGameAudio.muted = true;
  };

  public unmuteConsole = () => {
    localStorage.setItem("mute", "false");
    this.consoleOnAudio.muted = false;
    this.powerButonAudio.muted = false;
    this.settingsInspectAudio.muted = false;
    this.startGameAudio.muted = false;
  };

  public isMuted = () => {
    if (localStorage.getItem("mute") === "true") {
      return true;
    } else {
      return false;
    }
  };

  public setConsoleVolume = (volume = 1) => {
    this.consoleOnAudio.volume = volume;
    this.powerButonAudio.volume = volume;
    this.settingsInspectAudio.volume = volume;
    this.startGameAudio.volume = volume;
  };
}

export default ConsoleAudio;
