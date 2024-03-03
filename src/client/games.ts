export class Game {
  private _name: string;
  private _id: number;
  private _gameHTML: string;

  constructor(name: string, id: number) {
    this._name = name;
    this._id = id;
    this._gameHTML = `game_${id}`;
  }

  public get name(): string {
    return this._name;
  }

  public get id(): number {
    return this._id;
  }

  public get gameHTML(): string {
    return this._gameHTML;
  }
}

export class GamesList {
  private _games: Game[] = [];
  static instance: GamesList | null = null;

  constructor() {
    if (GamesList.instance) {
      return GamesList.instance;
    }
    GamesList.instance = this;
  }

  async fetchGames() {
    try {
      const response = await fetch(
        "https://ideal-carnival-7pp4jx974rgfppj5-8080.app.github.dev/v1/games",
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      this._games = data.games;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  get games() {
    return this._games;
  }
}
