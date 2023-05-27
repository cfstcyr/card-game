import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, delay, forkJoin, map, retry, tap } from 'rxjs';
import { Data } from '../../models/data';
import { Game, GameWithCards } from '../../models/game';
import { DataService } from '../data-service/data.service';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
    private gameList$: BehaviorSubject<Data<Game[]>> = new BehaviorSubject<Data<Game[]>>({ loading: true });
    private games$: BehaviorSubject<Map<string, Data<GameWithCards>>> = new BehaviorSubject(new Map());

    constructor(private readonly dataService: DataService) {}

    getGames(): Observable<Data<Game[]>> {
        this.fetchGames().subscribe();
        return this.gameList$.asObservable();
    }

    getGame(id: string): Observable<Data<GameWithCards>> {
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

    fetchGame(id: string): Observable<Data<GameWithCards>> {
        this.updateGame(id, { loading: true });

        return this.dataService.get<GameWithCards>(`/game/${id}`).pipe(
            tap((game) => {
                this.updateGame(id, game);
            }),
        );
    }

    private fetchAll(games: Game[]): Observable<Data<GameWithCards>[]> {
        return forkJoin(games.map(({ id }) => this.fetchGame(`${id}`)));
    }

    private updateGame(id: string, data: Data<GameWithCards>): void {
        const gamesMap = this.games$.value;
        gamesMap.set(id, data);
        this.games$.next(gamesMap);
    }
}
