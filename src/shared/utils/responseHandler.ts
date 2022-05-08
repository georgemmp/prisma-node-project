import { Response } from 'express';
import { StatusCode } from '../enums/StatusCode';

export const responseHandler = (response: Response, data?: Object | void) => ({
  created: () => response.status(StatusCode.CREATED).json(data),
  ok: () => response.status(StatusCode.OK).json(data),
  noContent: () => response.status(StatusCode.NO_CONTENT).send(),
});
