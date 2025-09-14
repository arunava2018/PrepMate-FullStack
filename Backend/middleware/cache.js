import { cacheClient } from "../utils/cacheClient.js";
export const cacheMiddleware = ({ ttl = 3600, key } = {}) => {
  return async (req, res, next) => {
    try {
      const cacheKey = typeof key === "function" ? key(req) : key ?? `${req.method}:${req.originalUrl}`;

      if (!cacheKey) return next();

      const cached = await cacheClient.get(cacheKey);
      if (cached) {
        return res.json(cached);
      }

      // Hook res.json to write to cache when controller responds
      const originalJson = res.json.bind(res);
      res.json = async (body) => {
        try {
          await cacheClient.set(cacheKey, body, ttl);
        } catch (e) {
          // swallow cache errors, still respond
          console.error("Cache set error:", e?.message || e);
        }
        return originalJson(body);
      };

      next();
    } catch (err) {
      console.error("Cache middleware error:", err);
      next(); // don't break the request if cache fails
    }
  };
};
