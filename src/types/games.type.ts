interface Games {
  name: string;
  id: number;
}

interface Color {
  YELLOW_BUTTON: HTMLButtonElement;
  BLUE_BUTTON: HTMLButtonElement;
  PINK_BUTTON: HTMLButtonElement;
  PURPLE_BUTTON: HTMLButtonElement;
  GREEN_BUTTON: HTMLButtonElement;
}

interface ColorLib {
  yellow: ColorLibDetails;
  blue: ColorLibDetails;
  pink: ColorLibDetails;
  purple: ColorLibDetails;
  green: ColorLibDetails;
}

interface ColorLibDetails {
  buttonElement: HTMLButtonElement;
  primary: string;
  accent: string;
  carving: string;
}
