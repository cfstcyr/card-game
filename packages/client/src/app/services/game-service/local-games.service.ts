import { Observable, delay, map, of } from "rxjs";
import { Data } from "src/app/models/data";
import { Game, GameWithCards } from "src/app/models/game";
import { IGameService } from "./games.interface";
import games from '../../../data/games.json'; 
import { ActiveGamesDB } from "src/app/db/active-games";

export class LocalGamesService implements IGameService {
    activeGames: ActiveGamesDB = new ActiveGamesDB();
    
    getGames(): Observable<Data<Game[]>> { 
        return this.fetchGames();
    }

    getGame(id: number): Observable<Data<GameWithCards>> {
        return this.fetchGame(id);
    }

    fetchGames(): Observable<Data<Game[]>> {
        return of({ value: games.games }).pipe(delay(10));
    }

    fetchGame(id: number): Observable<Data<GameWithCards>> {
        return this.fetchGames().pipe(map((games) => games.value?.find((game) => game.id === id)), map((game) => game ? { value: game as GameWithCards } : { error: 'Game not found' }))
    }
}