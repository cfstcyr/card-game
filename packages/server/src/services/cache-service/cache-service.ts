const DEFAULT_EXPIRY = 86_400_000; // 86_400_000 ms = 1 day

interface CacheItem<T> {
    value: T;
    expires: Date;
    tags: string[];
}

interface CacheOptions {
    expires_in: number;
    tags: string[];
}

export class CacheService {
    private cache: Map<string, CacheItem<unknown>> = new Map();
    private tags: Map<string, string[]> = new Map();

    set<T>(
        key: string,
        value: T,
        { expires_in = DEFAULT_EXPIRY, tags = [] }: Partial<CacheOptions> = {},
    ): void {
        this.cache.set(key, {
            value,
            expires: new Date(Date.now() + expires_in),
            tags,
        });

        for (const tag in tags) {
            const tag_items = this.tags.get(tag) ?? [];
            tag_items.push(key);
            this.tags.set(tag, tag_items);
        }
    }

    get<T>(key: string): T | undefined {
        const item = this.cache.get(key) as CacheItem<T>;

        if (!item) return undefined;

        if (item.expires < new Date()) {
            this.delete(key);
            return undefined;
        }

        return item.value;
    }

    delete(key: string): void {
        const item = this.cache.get(key);

        if (!item) return;

        for (const tag of item.tags) {
            const tag_items = this.tags.get(tag) ?? [];
            const index = tag_items.indexOf(key);
            tag_items.splice(index, 1);
            this.tags.set(tag, tag_items);
        }

        this.cache.delete(key);
    }

    invalidate(): void {
        this.cache.clear();
        this.tags.clear();
    }
}
