import { singleton } from 'tsyringe';
import { Game, IGame, IGameListItem } from '../../models/game';
import { DataEntryService } from '../data-entry-service/data-entry-service';
import { CacheService } from '../cache-service/cache-service';
import { WithId } from 'mongodb';

@singleton()
export class GameService extends DataEntryService<IGame> {
    constructor(cacheService: CacheService) {
        super(Game, cacheService, true);
    }

    async getAllGames(noCache = false): Promise<WithId<IGameListItem>[]> {
        const games = await this.getAll({}, undefined, 'name', noCache);

        return games.map((game) => ({
            _id: game._id,
            name: game.name,
            description: game.description,
            instructions: game.instructions,
            nsfw: game.nsfw,
            mode: game.mode,
            cardsCount: game.cards.length,
        }));
    }
}
