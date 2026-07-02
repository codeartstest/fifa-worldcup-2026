import rateLimit from 'express-rate-limit';
import { config } from '../utils/config';
import { errorEnvelope } from '../utils/envelope';
import { Request, Response } from 'express';

export const rateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: config.rateLimitPerMinute,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req: Request, res: Response) => {
    res.status(429).json(errorEnvelope('Too many requests, please try again later', 429));
  }
});