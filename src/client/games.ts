import { Games } from "./types/games.type.js";

export class GamesList {
  private _games: Games[] = [];
  static instance: GamesList | null = null;

  constructor() {
    if (GamesList.instance) {
      return GamesList.instance;
    }
    GamesList.instance = this;
  }

  async fetchGames() {
    try {
      const response = await fetch("/api/games");
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
