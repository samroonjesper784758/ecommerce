import { CustomError, ErrorCode } from "./root";

export class BadRequestException extends CustomError {
  constructor(message: string, errorCode: ErrorCode) {
    super(400, message, errorCode, null);
  }
}
