import StatusCodes from '../helpers/HttpStatusCodes';
import CustomError from './CustomError';

class BadRequest extends CustomError {
  constructor(message: string) {
    super(message, StatusCodes.BAD_REQUEST);
  }
}

export default BadRequest;
