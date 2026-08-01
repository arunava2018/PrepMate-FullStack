import NodeCache from 'node-cache';
import { Redis } from '@upstash/redis';

// Local in-memory cache (L1 cache) - default 10 minutes TTL
const localCache = new NodeCache({ stdTTL: 600, checkperiod: 120 });

let redis = null;
let redisDisabledUntil = 0; // Timestamp for circuit breaker cooldown

if (
  process.env.UPSTASH_REDIS_REST_URL &&
  process.env.UPSTASH_REDIS_REST_TOKEN
) {
  try {
    redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
  } catch (err) {
    console.warn('[Cache] Failed to initialize Upstash Redis client:', err.message);
    redis = null;
  }
}

function isRedisAvailable() {
  if (!redis) return false;
  if (Date.now() < redisDisabledUntil) return false;
  return true;
}

function handleRedisError(err) {
  const errMsg = err?.message || String(err);
  if (Date.now() >= redisDisabledUntil) {
    console.warn(
      `[Cache] Upstash Redis unreachable (${errMsg}). Falling back to fast in-memory cache.`
    );
  }
  // Disable Redis attempts for 60s to eliminate fetch timeouts & DNS delays
  redisDisabledUntil = Date.now() + 60000;
}

export const cacheClient = {
  async get(key) {
    // 1. Check L1 local cache first for sub-millisecond response times
    const localVal = localCache.get(key);
    if (localVal !== undefined && localVal !== null) {
      return localVal;
    }

    // 2. Check L2 Upstash Redis if available and active
    if (isRedisAvailable()) {
      try {
        const val = await redis.get(key);
        if (val !== null && typeof val !== 'undefined') {
          let parsed = val;
          if (typeof val === 'string') {
            try {
              parsed = JSON.parse(val);
            } catch {
              parsed = val;
            }
          }
          // Warm L1 cache for subsequent fast reads
          localCache.set(key, parsed, 300);
          return parsed;
        }
      } catch (err) {
        handleRedisError(err);
      }
    }

    return null;
  },

  async set(key, value, ttlSeconds = 3600) {
    // Always update L1 local cache
    localCache.set(key, value, ttlSeconds);

    // Also update L2 Upstash Redis if available
    if (isRedisAvailable()) {
      try {
        const payload = typeof value === 'string' ? value : JSON.stringify(value);
        await redis.set(key, payload, { ex: ttlSeconds });
      } catch (err) {
        handleRedisError(err);
      }
    }
  },

  async del(key) {
    // Evict from L1 cache
    localCache.del(key);

    // Evict from L2 Upstash Redis if available
    if (isRedisAvailable()) {
      try {
        await redis.del(key);
      } catch (err) {
        handleRedisError(err);
      }
    }
  },
};
