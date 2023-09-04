import { BehaviorSubject, Observable } from "rxjs";
import { CardDisplay } from "src/app/models/card";

export abstract class GamePlayProvider {
    protected cards$: BehaviorSubject<CardDisplay[] | undefined>;
    protected isLoading$: BehaviorSubject<boolean>;
    protected error$: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined);

    constructor(cards: CardDisplay[] | undefined = undefined, isLoading: boolean = false) {
        this.cards$ = new BehaviorSubject(cards);
        this.isLoading$ = new BehaviorSubject(isLoading);
    }

    get cards(): Observable<CardDisplay[] | undefined> {
        return this.cards$.asObservable();
    }

    get isLoading(): Observable<boolean> {
        return this.isLoading$.asObservable();
    }

    get error(): Observable<string | undefined> {
        return this.error$.asObservable();
    }

    getGameName(): string {
        return 'card games';
    }

    getCardsLength(): number {
        return this.cards$.value?.length ?? 0;
    }
}