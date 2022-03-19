import { Request, Response, NextFunction } from 'express';
import { StatusCode } from '../enums/StatusCode';
import { IError } from '../errors/interface/IError';
import { logger } from '../log/logger';

const log = logger('ErrorHandler');

export const errorMiddleware = (
  error: IError,
  request: Request,
  response: Response,
  _: NextFunction,
) => {
  if (error.name && error.name === 'application error') {
    log.error('Error: '.concat(JSON.stringify(error)));
    return response.status(error.statusCode).json({
      message: error.message,
    });
  }
  log.error('Error: '.concat(JSON.stringify(error)));
  return response.status(StatusCode.INTERNAL_ERROR).json({
    message: 'Internal server error',
  });
};
