import {CustomError} from '../errors/index.js';
import StatusCodes from '../helpers/HttpStatusCodes.js';
import {Request, Response, NextFunction} from 'express';

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

export default errorHandler;
