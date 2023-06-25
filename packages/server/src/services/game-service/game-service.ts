import { singleton } from 'tsyringe';
import { Game } from '../../models/game';
import { DatabaseService } from '../database-service/database-service';
import { DataEntryService } from '../data-entry-service/data-entry-service';
import { CacheService } from '../cache-service/cache-service';

@singleton()
export class GameService extends DataEntryService<Game> {
    constructor(databaseService: DatabaseService, cacheService: CacheService) {
        super(databaseService, 'games', cacheService);
    }
}
