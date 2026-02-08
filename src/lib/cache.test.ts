import { getCache, setCache } from './cache';

describe('cache', () => {
    beforeEach(() => {
        sessionStorage.clear();
    });

    it('armazena e recupera dados', () => {
        setCache('key', { name: 'Igor' }, 60_000);
        expect(getCache('key')).toEqual({ name: 'Igor' });
    });

    it('retorna null para chave inexistente', () => {
        expect(getCache('nope')).toBeNull();
    });

    it('respeita TTL — expira após o tempo', () => {
        vi.useFakeTimers();

        setCache('key', 'value', 1_000);
        expect(getCache('key')).toBe('value');

        vi.advanceTimersByTime(1_001);
        expect(getCache('key')).toBeNull();

        vi.useRealTimers();
    });

    it('retorna null e remove entrada com JSON corrompido', () => {
        sessionStorage.setItem('bad', '{invalid json}');
        expect(getCache('bad')).toBeNull();
        expect(sessionStorage.getItem('bad')).toBeNull();
    });

    it('não quebra quando sessionStorage.setItem lança erro (quota exceeded)', () => {
        const original = sessionStorage.setItem.bind(sessionStorage);
        vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
            throw new DOMException('QuotaExceededError');
        });

        expect(() => setCache('key', 'value', 60_000)).not.toThrow();

        vi.spyOn(Storage.prototype, 'setItem').mockImplementation(original);
    });
});
