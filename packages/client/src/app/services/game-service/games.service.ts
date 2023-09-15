import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, debounceTime, forkJoin, map, tap } from 'rxjs';
import { Data } from '../../models/data';
import { Game, GameListItem } from '../../models/game';
import { DataService } from '../data-service/data.service';
import { ActiveGamesDB } from 'src/app/db/active-games';
import { IGameService } from './games.interface';

@Injectable({
  providedIn: 'root'
})
export class GamesService implements IGameService {
    private gameList$: BehaviorSubject<Data<GameListItem[]>> = new BehaviorSubject<Data<GameListItem[]>>({ loading: true });
    private games$: BehaviorSubject<Map<string, Data<Game>>> = new BehaviorSubject(new Map());
    activeGames: ActiveGamesDB = new ActiveGamesDB();

    constructor(private readonly dataService: DataService) {}

    getGames(): Observable<Data<GameListItem[]>> {
        if(!this.gameList$.value.value) this.fetchGamesList().subscribe();
        return this.gameList$.pipe(debounceTime(10));
    }

    getGame(id: string): Observable<Data<Game>> {
        if(!this.gameList$.value.value) this.fetchGamesList().subscribe();
        return this.games$.pipe(debounceTime(10), map((gamesMap) => {
            const game = gamesMap.get(id);

            if(game) return game;

            if(this.gameList$.value.loading || this.gameList$.value.value?.find((game) => game._id == id)) return { loading: true };

            return { error: new Error('Game not found') }
        }));
    }

    fetchGamesList(noCache: boolean = false): Observable<Data<GameListItem[]>> {
        return this.dataService.get<GameListItem[]>('/game' + (noCache ? '?noCache=1' : '')).pipe(
            tap((games) => {
                this.gameList$.next(games);

                if (games.value) {
                    this.fetchAll(games.value).subscribe();
                }
            }),
        );
    }

    fetchGame(id: string): Observable<Data<Game>> {
        this.updateGame(id, { loading: true });

        return this.dataService.get<Game>(`/game/${id}`).pipe(
            tap((game) => {
                this.updateGame(id, game);
            }),
        );
    }

    private fetchAll(games: GameListItem[]): Observable<Data<Game>[]> {
        return forkJoin(games.map(({ _id }) => this.fetchGame(_id)));
    }

    private updateGame(id: string, data: Data<Game>): void {
        const gamesMap = this.games$.value;
        gamesMap.set(id, data);
        this.games$.next(gamesMap);
    }
}
