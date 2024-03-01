interface Games {
  name: string;
  id: number;
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
