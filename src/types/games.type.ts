interface Games {
  name: string;
  id: number;
}

interface Color {
  yellow: ColorDetails;
  blue: ColorDetails;
  pink: ColorDetails;
  purple: ColorDetails;
  green: ColorDetails;
}

interface ColorDetails {
  buttonElement: HTMLButtonElement;
  primary: string;
  accent: string;
  carving: string;
}
