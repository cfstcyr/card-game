import { singleton } from 'tsyringe';
import { Game, GameListItem, GameWithCards } from '../../models/game';
import { CardService } from '../card-service/card-service';
import { DatabaseService } from '../database-service/database-service';
import { DataEntryService } from '../data-entry-service/data-entry-service';

@singleton()
export class GameService extends DataEntryService<Game> {
    constructor(
        protected readonly databaseService: DatabaseService,
        private readonly cardsService: CardService,
    ) {
        super(databaseService, 'games');
    }

    async getGameList(): Promise<GameListItem[]> {
        const games: GameListItem[] = (await this.getAll()) as GameListItem[];

        await Promise.all(
            games.map(async (game, index) => {
                const count = (
                    await this.cardsService.collection
                        .where('gameId', '==', game.id)
                        .count()
                        .get()
                ).data().count;
                games[index].cardsCount = count;
            }),
        );

        return games;
    }

    async getWithCards(id: string): Promise<GameWithCards> {
        const game = await this.get(id);
        const cards = await this.cardsService.getCardsForGame(id);

        return { ...game, cards };
    }
}
