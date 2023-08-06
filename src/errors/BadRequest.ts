import StatusCodes from '../helpers/HttpStatusCodes.js';
import CustomError from './CustomError.js';

class BadRequest extends CustomError {
  constructor(message: string) {
    super(message, StatusCodes.BAD_REQUEST);
  }
}

export default BadRequest;
