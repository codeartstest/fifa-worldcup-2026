import NodeCache from 'node-cache';
import { config } from '../utils/config';

const cache = new NodeCache({
  stdTTL: config.cacheTtlNonLive,
  checkperiod: 60,
  useClones: false
});

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

export function getOrFetch<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl?: number
): Promise<{ data: T; cached: boolean; cacheTTL: number }> {
  const entry = cache.get<CacheEntry<T>>(key);
  if (entry) {
    return Promise.resolve({ data: entry.data, cached: true, cacheTTL: Math.max(0, Math.round((entry.timestamp + entry.ttl * 1000 - Date.now()) / 1000)) });
  }

  return fetcher().then(data => {
    const effectiveTtl = ttl ?? config.cacheTtlNonLive;
    const cacheEntry: CacheEntry<T> = { data, timestamp: Date.now(), ttl: effectiveTtl };
    cache.set(key, cacheEntry, effectiveTtl);
    return { data, cached: false, cacheTTL: effectiveTtl };
  });
}

export function getStale<T>(key: string): T | null {
  const entry = cache.get<CacheEntry<T>>(key);
  return entry ? entry.data : null;
}

export function getCacheKeys(): number {
  return cache.keys().length;
}