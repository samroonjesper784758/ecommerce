export class CustomError extends Error {
  statusCode: number;
  errorCode: ErrorCode;
  error?: any;
  constructor(
    statusCode: number,
    message: string,
    errorCode: ErrorCode,
    error?: any
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.error = error;
  }
}

export enum ErrorCode {
  USER_NOT_FOUND = 1001,
  USER_ALREADY_EXISTS = 1002,
  PASSWORD_DOES_NOT_MATCH = 1003,
}
