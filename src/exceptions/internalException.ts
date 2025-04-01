import { CustomError, ErrorCode } from "./root";

export class InternalException extends CustomError {
  constructor(message: string, errorCode: ErrorCode, error: any) {
    super(500, message, errorCode, error);
  }
}
