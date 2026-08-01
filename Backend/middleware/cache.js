import { cacheClient } from '../utils/cacheClient.js';

export const cacheMiddleware = ({ ttl = 3600, key } = {}) => {
  return async (req, res, next) => {
    try {
      const cacheKey =
        typeof key === 'function'
          ? key(req)
          : (key ?? `${req.method}:${req.originalUrl}`);

      if (!cacheKey) return next();

      const cached = await cacheClient.get(cacheKey);
      if (cached !== null && cached !== undefined) {
        return res.json(cached);
      }

      // Hook res.json to write to cache asynchronously when controller responds
      const originalJson = res.json.bind(res);
      res.json = (body) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          cacheClient.set(cacheKey, body, ttl).catch((e) => {
            console.error('[Cache] Middleware set error:', e?.message || e);
          });
        }
        return originalJson(body);
      };

      next();
    } catch (err) {
      console.error('[Cache] Middleware error:', err?.message || err);
      next(); // Don't break the request if cache fails
    }
  };
};

