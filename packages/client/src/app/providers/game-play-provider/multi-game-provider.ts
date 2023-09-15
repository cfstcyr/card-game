import { BehaviorSubject } from "rxjs";
import { GamePlayProvider } from "./game-play-provider";
import { Data, DataError, DataLoading } from "src/app/models/data";
import { Game } from "src/app/models/game";
import { GamesService } from "src/app/services/game-service/games.service";
import { CardDisplay } from "src/app/models/card";
import { shuffle } from "src/app/utils/random";

export class MultiGamePlayProvider extends GamePlayProvider {
    private games$: BehaviorSubject<Data<Game[]>> = new BehaviorSubject<Data<Game[]>>({ loading: true });

    constructor(private gameService: GamesService, gameIds: string[]) {
        super();

        this.games$.subscribe((games) => this.handleGames(games));
        this.gameService.getMultipleGames(gameIds).subscribe((games) => this.games$.next(games));
    }

    handleGames(games: Data<Game[]>) {
        if (games.loading) {
            this.handleGamesLoad(games);
            return;
        }

        if (games.error) {
            this.handleGamesError(games);
            return;
        }

        this.isLoading$.next(false);
        this.error$.next(undefined);

        const cards = shuffle(
            games.value.flatMap(
                (game) =>
                    game.cards.map<CardDisplay>(
                        (card) => ({ ...card, contentTop: game.name })
                    )
            )
        );
        this.cards$.next(cards);
    }

    handleGamesLoad(data: DataLoading): void {
        this.isLoading$.next(data.loading);
    }

    handleGamesError(data: DataError): void {
        this.error$.next(data.error.message);
    }
}