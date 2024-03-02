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
  private games: Game[] = [];
  static instance: GamesList;

  constructor() {
    if (GamesList.instance) {
      return GamesList.instance;
    }
    return this;
  }

  addGame(game: Game) {
    this.games.push(game);
  }
}
