import { StatusCodes } from 'http-status-codes';
import { singleton } from 'tsyringe';
import { Game, GameWithCards } from '../../models/game';
import { HttpException } from '../../models/http-exception';
import { CardService } from '../card-service/card-service';
import { DatabaseService } from '../database-service/database-service';

@singleton()
export class GameService {
    constructor(
        private readonly databaseService: DatabaseService,
        private readonly cardService: CardService,
    ) {}

    private get db() {
        return this.databaseService.client<Game>('Game');
    }

    async getGames(): Promise<Game[]> {
        return await this.db.select('*');
    }

    async getGame(id: number | string): Promise<GameWithCards> {
        const game = await this.db
            .select('*')
            .where({ id: Number(id) })
            .first();

        if (!game)
            throw new HttpException(
                `Cannot find game with ID "${id}"`,
                StatusCodes.NOT_FOUND,
            );

        const cards = await this.cardService.getCardsForGame(id);

        return { ...game, cards };
    }

    async createGame(game: Omit<Game, 'id'>): Promise<Game> {
        const max = await this.db.max('id', { as: 'max' });
        const id = max.length > 0 ? max[0].max + 1 : 0;

        await this.db.insert([{ ...game, id }]);

        return this.getGame(id);
    }

    async updateGame(
        gameId: number | string,
        game: Partial<Omit<Game, 'id'>> & { cards?: string[] },
    ): Promise<Game> {
        const {
            name,
            description,
            mode,
            nsfw,
            instructions,
            image,
            color,
            cards,
        } = game;

        await this.db
            .update({
                name,
                description,
                mode,
                nsfw,
                instructions,
                image,
                color,
            })
            .where({ id: Number(gameId) });

        if (cards) await this.cardService.updateAllCardsForGame(gameId, cards);

        return this.getGame(gameId);
    }

    async deleteGame(gameId: string | number): Promise<void> {
        await this.cardService.deleteCardsForGame(gameId);

        await this.db.delete().where({ id: Number(gameId) });
    }
}
