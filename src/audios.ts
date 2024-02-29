class ConsoleAudio {
  private consoleOnAudio = new Audio("../src/audio/consoleOnAudio.mp3");
  private powerButonAudio = new Audio("../src/audio/powerButtonAudio.mp3");

  public playConsoleOnAudio = () => {
    this.playPowerButtonAudio();
    this.playConsoleIntroAudio();
  };

  public playConsoleOffAudio = () => {
    this.playPowerButtonAudio();
  };

  private playPowerButtonAudio = () => {
    this.powerButonAudio.play();
    setTimeout(() => {
      this.powerButonAudio.currentTime = 0;
    }, 1000);
  };

  private playConsoleIntroAudio = () => {
    this.consoleOnAudio.play();
    setTimeout(() => {
      this.consoleOnAudio.currentTime = 0;
    }, 1000);
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
  };
}

export default ConsoleAudio;
