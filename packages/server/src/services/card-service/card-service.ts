import { singleton } from 'tsyringe';
import { Card } from '../../models/card';
import { HttpException } from '../../models/http-exception';
import { DatabaseService } from '../database-service/database-service';

@singleton()
export class CardService {
    constructor(private readonly databaseService: DatabaseService) {}

    private get db() {
        return this.databaseService.client<Card>('Card');
    }

    async getCards(): Promise<Card[]> {
        return this.db.select('*');
    }

    async getCardsForGame(
        gameId: number | string,
    ): Promise<Omit<Card, 'gameId'>[]> {
        return this.db
            .select('id', 'content')
            .where({ gameId: Number(gameId) });
    }

    async createCard(card: Omit<Card, 'id'>): Promise<Card> {
        const max = await this.db.max('id', { as: 'max' });
        const id = max.length > 0 ? max[0].max + 1 : 0;

        await this.db.insert({ ...card, id });

        const newCard = await this.db.select('*').where({ id }).first();

        if (!newCard) throw new HttpException('Error while creating card');

        return newCard;
    }

    async updateAllCardsForGame(
        gameId: number | string,
        content: string[],
    ): Promise<Omit<Card, 'gameId'>[]> {
        await this.deleteCardsForGame(gameId);
        await this.db.insert(
            content.map((c, i) => ({
                content: c,
                gameId: Number(gameId),
                id: i,
            })),
        );
        return this.getCardsForGame(gameId);
    }

    async deleteCardsForGame(gameId: number | string): Promise<void> {
        await this.db.delete().where({ gameId: Number(gameId) });
    }
}
