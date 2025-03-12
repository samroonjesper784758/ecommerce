import { ErrorCode, HttpExceptions } from "./root";

export class BadRequestExceptions extends HttpExceptions {
  constructor(message: string, errorCode: ErrorCode) {
    super(message, errorCode, 400, null);
  }
}
