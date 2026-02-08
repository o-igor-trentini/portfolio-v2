import { SessionCache } from './cache';

describe('SessionCache', () => {
    let cache: SessionCache;

    beforeEach(() => {
        sessionStorage.clear();
        cache = new SessionCache('test');
    });

    it('armazena e recupera dados', () => {
        cache.set('key', { name: 'Igor' }, 60_000);
        expect(cache.get('key')).toEqual({ name: 'Igor' });
    });

    it('retorna null para chave inexistente', () => {
        expect(cache.get('nope')).toBeNull();
    });

    it('respeita TTL — expira após o tempo', () => {
        vi.useFakeTimers();

        cache.set('key', 'value', 1_000);
        expect(cache.get('key')).toBe('value');

        vi.advanceTimersByTime(1_001);
        expect(cache.get('key')).toBeNull();

        vi.useRealTimers();
    });

    it('has() retorna true/false corretamente', () => {
        expect(cache.has('key')).toBe(false);
        cache.set('key', 42, 60_000);
        expect(cache.has('key')).toBe(true);
    });

    it('remove() apaga a chave', () => {
        cache.set('key', 'value', 60_000);
        cache.remove('key');
        expect(cache.get('key')).toBeNull();
    });

    it('clear() remove apenas chaves do próprio prefixo', () => {
        const other = new SessionCache('other');

        cache.set('a', 1, 60_000);
        cache.set('b', 2, 60_000);
        other.set('c', 3, 60_000);

        cache.clear();

        expect(cache.get('a')).toBeNull();
        expect(cache.get('b')).toBeNull();
        expect(other.get('c')).toBe(3);
    });

    it('retorna null e remove entrada com JSON corrompido', () => {
        sessionStorage.setItem('test:bad', '{invalid json}');
        expect(cache.get('bad')).toBeNull();
        expect(sessionStorage.getItem('test:bad')).toBeNull();
    });

    it('não quebra quando sessionStorage.setItem lança erro (quota exceeded)', () => {
        const original = sessionStorage.setItem.bind(sessionStorage);
        vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
            throw new DOMException('QuotaExceededError');
        });

        // Não deve lançar exceção
        expect(() => cache.set('key', 'value', 60_000)).not.toThrow();

        vi.spyOn(Storage.prototype, 'setItem').mockImplementation(original);
    });
});
