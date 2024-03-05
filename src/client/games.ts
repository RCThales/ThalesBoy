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

  async fetchGamesFromApi() {
    try {
      const response = await fetch("/api/games");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      this._games = data.games;
      this.cacheGamesList();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  async fetchGamesFromCache() {
    this._games = this.getCachedGamesList();
    if (!this._games) {
      await this.fetchGamesFromApi();
    }
  }

  cacheGamesList() {
    if (!localStorage.getItem("games")) {
      localStorage.setItem("games", JSON.stringify(this._games));
    }
  }

  getCachedGamesList() {
    const cachedGamesList = JSON.parse(
      localStorage.getItem("games") as string,
    ) as Games[];
    return cachedGamesList;
  }

  get games() {
    return this._games;
  }
}
