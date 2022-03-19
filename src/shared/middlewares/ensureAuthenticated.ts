import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { StatusCode } from '../enums/StatusCode';
import { applicationError } from '../errors/applicationError';
import { SECRET_JWT } from '../../config/environments';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export const ensureAuthenticated = (
  request: Request,
  response: Response,
  next: NextFunction,
): void => {
  const authHeader = request.headers.authorization;

  if (!authHeader)
    throw applicationError('JWT token is missing', StatusCode.UNAUTHORIZED);

  const [, token] = authHeader.split(' ');

  try {
    const decode = verify(token, `${SECRET_JWT}`);
    const { sub } = decode as TokenPayload;

    request.user = {
      id: sub,
    };

    next();
  } catch (error) {
    throw applicationError('Invalid token', StatusCode.UNAUTHORIZED);
  }
};
