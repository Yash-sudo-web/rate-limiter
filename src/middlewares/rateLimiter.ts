import { Request, Response, NextFunction } from 'express';
import redisClient from '../config/redis';

const WINDOW_SIZE_IN_SECONDS = 60;
const MAX_REQUESTS = 5;

export const rateLimiter = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const ip = req.ip;
  const key = `ip:${ip}`;

  (async () => {
    try {
      const requests = await redisClient.get(key);

      if (requests) {
        const requestCount = parseInt(requests);

        if (requestCount >= MAX_REQUESTS) {
          return res
            .status(429)
            .json({ message: 'Too many requests. Please try again later.' });
        }

        await redisClient.incr(key);
      } else {
        await redisClient.set(key, '1', { EX: WINDOW_SIZE_IN_SECONDS });
      }

      next();
    } catch (error) {
      console.error('Rate limiter error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  })();
};
