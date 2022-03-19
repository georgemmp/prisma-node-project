import { Request, Response, NextFunction } from 'express';
import { logger } from '../log/logger';

export const logMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { method, url } = request;
  const log = logger(method);
  log.info(`${method} ${url} - Time: ${new Date().getUTCMilliseconds()}ms`);
  next();
};
