import { Observable } from "rxjs";
import { ActiveGamesDB } from "src/app/db/active-games";
import { Data } from "src/app/models/data";
import { Game } from "src/app/models/game";

export interface IGameService {
    activeGames: ActiveGamesDB;

    getGames(): Observable<Data<Game[]>>;
    getGame(id: string): Observable<Data<Game>>;
    fetchGames(): Observable<Data<Game[]>>;
    // fetchGame(id: string): Observable<Data<Game>>;
}