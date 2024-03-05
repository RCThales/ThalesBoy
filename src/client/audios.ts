class ConsoleAudio {
  static instance: ConsoleAudio | null = null;
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
    this.consoleOnAudio.muted = true;
    this.powerButonAudio.muted = true;
  };

  public unmuteConsole = () => {
    this.consoleOnAudio.muted = false;
    this.powerButonAudio.muted = false;
  };

  public setConsoleVolume = (volume = 1) => {
    this.consoleOnAudio.volume = volume;
    this.powerButonAudio.volume = volume;
    this.settingsInspectAudio.volume = volume;
    this.startGameAudio.volume = volume;
  };
}

export default ConsoleAudio;
