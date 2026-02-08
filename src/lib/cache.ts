interface CacheEntry<T> {
    data: T;
    expiresAt: number;
}

export class SessionCache {
    private prefix: string;

    constructor(prefix: string) {
        this.prefix = prefix;
    }

    private key(name: string): string {
        return `${this.prefix}:${name}`;
    }

    get<T>(name: string): T | null {
        try {
            const raw = sessionStorage.getItem(this.key(name));
            if (!raw) return null;

            const entry: CacheEntry<T> = JSON.parse(raw);

            if (Date.now() > entry.expiresAt) {
                this.remove(name);
                return null;
            }

            return entry.data;
        } catch {
            this.remove(name);
            return null;
        }
    }

    set<T>(name: string, data: T, ttlMs: number): void {
        try {
            const entry: CacheEntry<T> = {
                data,
                expiresAt: Date.now() + ttlMs,
            };

            sessionStorage.setItem(this.key(name), JSON.stringify(entry));
        } catch {
            // quota exceeded — ignora silenciosamente
        }
    }

    has(name: string): boolean {
        return this.get(name) !== null;
    }

    remove(name: string): void {
        try {
            sessionStorage.removeItem(this.key(name));
        } catch {
            // ignora
        }
    }

    clear(): void {
        try {
            const keysToRemove: string[] = [];

            for (let i = 0; i < sessionStorage.length; i++) {
                const key = sessionStorage.key(i);
                if (key?.startsWith(`${this.prefix}:`)) {
                    keysToRemove.push(key);
                }
            }

            keysToRemove.forEach((key) => sessionStorage.removeItem(key));
        } catch {
            // ignora
        }
    }
}

// TTL: 1 hora para GitHub, 60 segundos para música
export const githubCache = new SessionCache('github');
export const musicCache = new SessionCache('music');
