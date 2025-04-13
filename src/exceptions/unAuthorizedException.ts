import { CustomError, ErrorCode } from "./root";

export class unAuthorizedException extends CustomError {
  constructor(message: string, errorCode: ErrorCode) {
    super(401, message, errorCode);
  }
}
