import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, forkJoin, map, tap } from 'rxjs';
import { Data } from '../../models/data';
import { Game } from '../../models/game';
import { DataService } from '../data-service/data.service';
import { ActiveGamesDB } from 'src/app/db/active-games';
import { IGameService } from './games.interface';

@Injectable({
  providedIn: 'root'
})
export class GamesService implements IGameService {
    private gameList$: BehaviorSubject<Data<Game[]>> = new BehaviorSubject<Data<Game[]>>({ loading: true });
    // private games$: BehaviorSubject<Map<string, Data<Game>>> = new BehaviorSubject(new Map());
    activeGames: ActiveGamesDB = new ActiveGamesDB();

    constructor(private readonly dataService: DataService) {}

    getGames(): Observable<Data<Game[]>> {
        if(!this.gameList$.value.value) this.fetchGames().subscribe();
        return this.gameList$.asObservable();
    }

    getGame(id: string): Observable<Data<Game>> {
        if(!this.gameList$.value.value) this.fetchGames().subscribe();
        return this.gameList$.pipe(map((games) => {
            const game = games.value?.find((game) => game.id === id);

            return game ? { value: game } : { error: 'Game not found' };
        }))
    }

    fetchGames(): Observable<Data<Game[]>> {
        return this.dataService.get<Game[]>('/game').pipe(
            tap((games) => {
                this.gameList$.next(games);

                // if (games.value) {
                //     this.fetchAll(games.value).subscribe();
                // }
            }),
        );
    }

    // fetchGame(id: string): Observable<Data<Game>> {
    //     this.updateGame(id, { loading: true });

    //     return this.dataService.get<Game>(`/game/${id}`).pipe(
    //         tap((game) => {
    //             this.updateGame(id, game);
    //         }),
    //     );
    // }

    // private fetchAll(games: Game[]): Observable<Data<Game>[]> {
    //     return forkJoin(games.map(({ id }) => this.fetchGame(id)));
    // }

    // private updateGame(id: string, data: Data<Game>): void {
    //     const gamesMap = this.games$.value;
    //     gamesMap.set(id, data);
    //     this.games$.next(gamesMap);
    // }
}
