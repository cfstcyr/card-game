import { BehaviorSubject } from "rxjs";
import { GamePlayProvider } from "./game-play-provider";
import { Data, DataError, DataLoading } from "src/app/models/data";
import { Game } from "src/app/models/game";
import { GamesService } from "src/app/services/game-service/games.service";
import { shuffle } from "src/app/utils/random";

export class DefaultGamePlayProvider extends GamePlayProvider {
    private game$: BehaviorSubject<Data<Game>> = new BehaviorSubject<Data<Game>>({ loading: true });
    private currentGameId: string | undefined = undefined;

    constructor(private gameService: GamesService, gameId: string) {
        super();

        this.game$.subscribe((game) => this.handleGame(game));
        gameService.getGame(gameId).subscribe((game) => this.game$.next(game));
    }

    handleGame(game: Data<Game>) {
        if (game.value && this.currentGameId === game.value._id) return;

        this.isLoading$.next(false);
        this.error$.next(undefined);

        if (game.loading) {
            this.handleGameLoad(game);
            return;
        }

        if (game.error) {
            this.handleGameError(game);
            return;
        }

        this.currentGameId = game.value._id;

        const shuffledCards = shuffle(game.value.cards);
        this.cards$.next(shuffledCards);
        
        this.gameService.activeGames.set({
            gameId: game.value._id,
            cardsId: shuffledCards.map((card) => card.id),
            currentIndex: 0,
        });
    }

    handleGameLoad(data: DataLoading): void {
        this.isLoading$.next(data.loading);
    }

    handleGameError(data: DataError): void {
        this.error$.next(data.error.message);
    }

    override getGameName(): string {
        return this.game$.value.value?.name ?? '';
    }
}