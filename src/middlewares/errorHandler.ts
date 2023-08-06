import {CustomError} from '../errors';
import StatusCodes from '../helpers/HttpStatusCodes';
import express, {Request, Response, NextFunction} from 'express';

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError)
    return res.status(err.statusCode).json({msg: err.message});

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({err});
};
