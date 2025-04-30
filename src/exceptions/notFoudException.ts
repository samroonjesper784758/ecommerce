import { CustomError, ErrorCode } from "./root";

export class NotFoundExceptions extends CustomError {
  constructor(message: string, errorCode: ErrorCode) {
    super(404, message, errorCode);
  }
}