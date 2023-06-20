import { Observable } from "rxjs";
import { ActiveGamesDB } from "src/app/db/active-games";
import { Data } from "src/app/models/data";
import { Game, GameWithCards } from "src/app/models/game";

export interface IGameService {
    activeGames: ActiveGamesDB;

    getGames(): Observable<Data<Game[]>>;
    getGame(id: number): Observable<Data<GameWithCards>>;
    fetchGames(): Observable<Data<Game[]>>;
    fetchGame(id: number): Observable<Data<GameWithCards>>;
}