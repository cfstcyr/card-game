import { singleton } from 'tsyringe';
import { Card } from '../../models/card';
import { DatabaseService } from '../database-service/database-service';
import { DataEntryService } from '../data-entry-service/data-entry-service';
import { Entry } from '../../models/entry';

@singleton()
export class CardService extends DataEntryService<Card> {
    constructor(protected readonly databaseService: DatabaseService) {
        super(databaseService, 'cards');
    }

    async getCardsForGame(
        gameId: string,
    ): Promise<Omit<Entry<Card>, 'gameId'>[]> {
        return (
            await this.collection
                .where('gameId', '==', gameId)
                .select('content')
                .get()
        ).docs.map(
            (doc) =>
                ({ id: doc.id, ...doc.data() } as Omit<Entry<Card>, 'gameId'>),
        );
    }

    async updateAllCardsForGame(
        gameId: string,
        content: string[],
    ): Promise<Omit<Entry<Card>, 'gameId'>[]> {
        await this.deleteCardsForGame(gameId);

        const result: Omit<Entry<Card>, 'gameId'>[] = [];

        for (const cardContent of content) {
            const data = {
                content: cardContent,
                gameId,
            };
            const res = await this.collection.add(data);
            result.push({ id: res.id, ...data });
        }

        return result;
    }

    async deleteCardsForGame(gameId: string): Promise<void> {
        await this.deleteQueryBatch(
            this.collection.where('gameId', '==', gameId),
        );
    }

    // constructor(private readonly databaseService: DatabaseService) {}

    // private get db() {
    //     return this.databaseService.client<Card>('Card');
    // }

    // private get collection() {
    //     return this.databaseService.collection<Card>('cards');
    // }

    // async getCards(): Promise<Card[]> {
    //     return (await this.collection.get()).docs.map((doc) => doc.data());
    // }

    // async getCardsForGame(gameId: string): Promise<Omit<Card, 'gameId'>[]> {
    //     return (
    //         await this.collection
    //             .where('gameId', '==', gameId)
    //             .select('id', 'content')
    //             .get()
    //     ).docs.map((doc) => doc.data() as Omit<Card, 'gameId'>);
    // }

    // async createCard(card: Omit<Card, 'id'>): Promise<Card> {
    //     const id = (
    //         await this.collection
    //             .where('gameId', '==', card.gameId)
    //             .count()
    //             .get()
    //     ).data().count;

    //     this.collection.doc(`${card.gameId}/${id}`).set({ id, ...card });

    //     return { id, ...card };
    // }

    // async updateAllCardsForGame(
    //     gameId: string,
    //     content: string[],
    // ): Promise<Omit<Card, 'gameId'>[]> {
    //     await this.deleteCardsForGame(gameId);

    //     const batch = this.databaseService.db.batch();

    //     for (const cardContent of content) {
    //         batch.set(this.databaseService.db.)
    //     }

    // await this.db.insert(
    //     content.map((c, i) => ({
    //         content: c,
    //         gameId: Number(gameId),
    //         id: i,
    //     })),
    // );
    // return this.getCardsForGame(gameId);
    // }

    // async deleteCardsForGame(gameId: number | string): Promise<void> {
    //     await this.db.delete().where({ gameId: Number(gameId) });
    // }
}
