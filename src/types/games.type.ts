export interface Games {
  name: string;
  id: number;
}

export interface ColorLib {
  yellow: ColorLibDetails;
  blue: ColorLibDetails;
  pink: ColorLibDetails;
  purple: ColorLibDetails;
  green: ColorLibDetails;
}

export interface ColorLibDetails {
  buttonElement: HTMLButtonElement;
  primary: string;
  accent: string;
  carving: string;
}
