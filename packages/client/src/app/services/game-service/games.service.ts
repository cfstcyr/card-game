import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, forkJoin, map, tap } from 'rxjs';
import { Data } from '../../models/data';
import { Game, GameWithCards } from '../../models/game';
import { DataService } from '../data-service/data.service';
import { ActiveGamesDB } from 'src/app/db/active-games';
import { IGameService } from './games.interface';

@Injectable({
  providedIn: 'root'
})
export class GamesService implements IGameService {
    private gameList$: BehaviorSubject<Data<Game[]>> = new BehaviorSubject<Data<Game[]>>({ loading: true });
    private games$: BehaviorSubject<Map<number, Data<GameWithCards>>> = new BehaviorSubject(new Map());
    activeGames: ActiveGamesDB = new ActiveGamesDB();

    constructor(private readonly dataService: DataService) {}

    getGames(): Observable<Data<Game[]>> {
        if(!this.gameList$.value.value) this.fetchGames().subscribe();
        return this.gameList$.asObservable();
    }

    getGame(id: number): Observable<Data<GameWithCards>> {
        this.fetchGame(id).subscribe();
        return this.games$.pipe(map((gamesMap) => gamesMap.get(id) ?? { error: 'Game not found' }));
    }

    fetchGames(): Observable<Data<Game[]>> {
        return this.dataService.get<Game[]>('/game').pipe(
            tap((games) => {
                this.gameList$.next(games);

                if (games.value) {
                    this.fetchAll(games.value).subscribe();
                }
            }),
        );
    }

    fetchGame(id: number): Observable<Data<GameWithCards>> {
        this.updateGame(id, { loading: true });

        return this.dataService.get<GameWithCards>(`/game/${id}`).pipe(
            tap((game) => {
                this.updateGame(id, game);
            }),
        );
    }

    private fetchAll(games: Game[]): Observable<Data<GameWithCards>[]> {
        return forkJoin(games.map(({ id }) => this.fetchGame(id)));
    }

    private updateGame(id: number, data: Data<GameWithCards>): void {
        const gamesMap = this.games$.value;
        gamesMap.set(id, data);
        this.games$.next(gamesMap);
    }
}
