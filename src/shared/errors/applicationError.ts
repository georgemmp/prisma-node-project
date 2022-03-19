import { IError } from './interface/IError';

export const applicationError = (
  message: string,
  statusCode: number,
): IError => ({
  message,
  statusCode,
  name: 'application error',
});
