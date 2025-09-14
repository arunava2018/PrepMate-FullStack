import NodeCache from "node-cache";
import { Redis } from "@upstash/redis";
const localCache = new NodeCache({ stdTTL: 600 });
let redis = null;
if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
}

export const cacheClient = {
  async get(key) {
    if (redis) {
      const val = await redis.get(key);
      if (val === null || typeof val === "undefined") return null;
      try {
        return JSON.parse(val);
      } catch {
        return val;
      }
    } else {
      return localCache.get(key) ?? null;
    }
  },

  async set(key, value, ttlSeconds = 3600) {
    if (redis) {
      // Upstash expects strings; set with expiry
      const payload = typeof value === "string" ? value : JSON.stringify(value);
      await redis.set(key, payload, { ex: ttlSeconds });
    } else {
      localCache.set(key, value, ttlSeconds);
    }
  },

  async del(key) {
    if (redis) {
      await redis.del(key);
    } else {
      localCache.del(key);
    }
  },
};
