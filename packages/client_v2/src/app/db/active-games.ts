import Dexie, { Table } from "dexie";
import { Observable, Subject, from, map, tap } from "rxjs";

interface ActiveGame {
    currentIndex: number;
    gameId: number;
    cardsId: number[];
    date: Date;
}

export class ActiveGamesDB extends Dexie {
    private activeGames!: Table<ActiveGame & { id: number }, number>;

    constructor() {
        super('active-games');

        this.version(1).stores({
            activeGames: '++id'
        });
    }

    set(activeGame: Omit<ActiveGame, 'date'>): Observable<number> {
        return from(this.activeGames.put({ ...activeGame, id: activeGame.gameId, date: new Date() }, activeGame.gameId));
    }

    get(gameId: number): Observable<ActiveGame & { id: number } | undefined> {
        return from(this.activeGames.get(gameId));
    }

    remove(gameId: number): Observable<void> {
        return from(this.activeGames.delete(gameId));
    }

    getAll(): Observable<(ActiveGame & { id: number })[]> {
        return from(this.activeGames.toArray()).pipe(map((games) => games.sort((a, b) => a.date < b.date ? 1 : -1))) as any;
    }

    updateCurrentIndex(gameId: number, currentIndex: number): Observable<boolean> {
        const s = new Subject<boolean>();

        this.get(gameId).subscribe((activeGame) => {
            if(activeGame) this.set({ ...activeGame, currentIndex });
            s.next(!!activeGame);
            s.complete();
        });

        return s;
    }
}