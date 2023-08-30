import { singleton } from 'tsyringe';
import { Game, IGame, IGameListItem } from '../../models/game';
import { DataEntryService } from '../data-entry-service/data-entry-service';
import { CacheService } from '../cache-service/cache-service';
import { WithId } from 'mongodb';
import { HttpException } from '../../models/http-exception';
import mongoose from 'mongoose';

@singleton()
export class GameService extends DataEntryService<IGame> {
    constructor(cacheService: CacheService) {
        super(Game, cacheService, true);
    }

    async getAllGames(noCache = false): Promise<WithId<IGameListItem>[]> {
        const games = await this.getAll(
            {},
            undefined,
            'name',
            undefined,
            noCache,
        );

        return games.map((game) => ({
            _id: game._id,
            name: game.name,
            description: game.description,
            instructions: game.instructions,
            nsfw: game.nsfw,
            mode: game.mode,
            cardsCount: game.cards.length,
            parent: game.parent,
            children: game.children,
        }));
    }

    async update(id: string, update: Partial<IGame>): Promise<WithId<IGame>> {
        if (update.parent === 'None') {
            update.parent = null as unknown as undefined;
        }

        if (update.parent) {
            if (await this.hasGraphLoop(id, update.parent, 1)) {
                throw new HttpException(
                    `Cannot set parent ${update.parent} to game ${id}: Loop dependency created.`,
                );
            }

            const parent = await this.get(update.parent);

            await this.update(parent._id.toString(), {
                children: [...(parent.children ?? []), id],
            });
        }

        const old = await this.get(id);

        if (old.parent && old.parent !== update.parent) {
            const parent = await this.get(old.parent);
            const children = parent.children ?? [];
            const index = children.indexOf(id);
            children.splice(index, 1);

            await this.update(parent._id.toString(), { children });
        }

        return super.update(id, update);
    }

    private async hasGraphLoop(
        gameId: string | mongoose.Schema.Types.ObjectId,
        parentId: string | mongoose.Schema.Types.ObjectId,
        maxDepth: number | undefined = undefined,
        visited: string[] = [],
        currentDepth = 0,
    ): Promise<boolean> {
        if (maxDepth && currentDepth >= maxDepth)
            throw new HttpException(
                `Cannot set parent: max depth (${maxDepth}) exeeded.`,
            );

        gameId = gameId.toString();
        parentId = parentId.toString();

        visited.push(gameId);

        if (visited.includes(parentId)) return true;

        const parent = await this.get(parentId);

        if (parent.parent) {
            return this.hasGraphLoop(
                parentId,
                parent.parent,
                maxDepth,
                visited,
                currentDepth + 1,
            );
        }

        return false;
    }
}
