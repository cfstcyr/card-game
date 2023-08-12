import { singleton } from 'tsyringe';
import { Game, IGame } from '../../models/game';
import { DataEntryService } from '../data-entry-service/data-entry-service';
import { CacheService } from '../cache-service/cache-service';

@singleton()
export class GameService extends DataEntryService<IGame> {
    constructor(cacheService: CacheService) {
        super(Game, cacheService, true);
    }
}
