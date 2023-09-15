import { Observable } from "rxjs";
import { ActiveGamesDB } from "src/app/db/active-games";
import { Data } from "src/app/models/data";
import { Game, GameListItem } from "src/app/models/game";

export interface IGameService {
    activeGames: ActiveGamesDB;

    getGames(): Observable<Data<GameListItem[]>>;
    getGame(id: string): Observable<Data<Game>>;
    fetchGamesList(): Observable<Data<GameListItem[]>>;
    fetchGame(id: string): Observable<Data<Game>>;
}