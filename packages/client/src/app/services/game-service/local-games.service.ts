import { Observable, delay, map, of } from "rxjs";
import { Data } from "src/app/models/data";
import { Game } from "src/app/models/game";
import { IGameService } from "./games.interface";
import { ActiveGamesDB } from "src/app/db/active-games";

export class LocalGamesService implements IGameService {
    activeGames: ActiveGamesDB = new ActiveGamesDB();
    
    getGames(): Observable<Data<Game[]>> { 
        return this.fetchGames();
    }

    getGame(id: string): Observable<Data<Game>> {
        return this.fetchGame(id);
    }

    fetchGames(): Observable<Data<Game[]>> {
        return of({ value: [] }).pipe(delay(10));
    }

    fetchGame(id: string): Observable<Data<Game>> {
        return this.fetchGames().pipe(map((games) => games.value?.find((game) => game._id === id)), map((game) => game ? { value: game as Game } : { error: 'Game not found' }))
    }
}