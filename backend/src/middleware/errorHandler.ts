import { Request, Response, NextFunction } from 'express';
import { errorEnvelope } from '../utils/envelope';

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction): void {
  console.error(`[ERROR] ${err.message}`, err.stack);
  const status = (err as any).status || 500;
  res.status(status).json(errorEnvelope(err.message || 'Internal server error', status));
}