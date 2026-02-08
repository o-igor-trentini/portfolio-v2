interface CacheEntry<T> {
    data: T;
    expiresAt: number;
}

export function getCache<T>(key: string): T | null {
    try {
        const raw = sessionStorage.getItem(key);
        if (!raw) return null;

        const entry: CacheEntry<T> = JSON.parse(raw);

        if (Date.now() > entry.expiresAt) {
            sessionStorage.removeItem(key);
            return null;
        }

        return entry.data;
    } catch {
        sessionStorage.removeItem(key);
        return null;
    }
}

export function setCache<T>(key: string, data: T, ttlMs: number): void {
    try {
        const entry: CacheEntry<T> = { data, expiresAt: Date.now() + ttlMs };
        sessionStorage.setItem(key, JSON.stringify(entry));
    } catch {
        // quota exceeded — ignora silenciosamente
    }
}
