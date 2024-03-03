export interface Games {
  name: string;
  id: number;
  imageUrl: string;
  gameUrl: string;
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
