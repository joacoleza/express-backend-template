import { Request } from 'express';
import { rateLimit } from 'express-rate-limit';

import { isNumber } from '../utils/isNumber';

const getLimit = (): number =>
  isNumber(process.env.RATE_LIMIT_WINDOW_MINUTES)
    ? process.env.RATE_LIMIT_WINDOW_MINUTES
    : 1000;

const getWindow = (): number =>
  isNumber(process.env.RATE_LIMIT_MAX_REQUESTS)
    ? process.env.RATE_LIMIT_MAX_REQUESTS
    : 10;

export const getRateLimiter = () =>
  rateLimit({
    legacyHeaders: true,
    limit: getLimit(),
    message: 'Too many requests, please try again later.',
    standardHeaders: true,
    windowMs: getWindow() * 60 * 1000,
    keyGenerator: (req: Request) => req.ip as string
  });
