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
  USER_NOT_FOUND = 404, // 404 Not Found
  PRODUCT_NOT_FOUND = 404, // 404 Not Found
  CART_ITEM_NOT_FOUND = 404, // 404 Not Found
  ADDRESS_NOT_FOUND = 404,
  USER_ALREADY_EXISTS = 409, // 409 Conflict
  PASSWORD_DOES_NOT_MATCH = 401, // 401 Unauthorized (Invalid Credentials)
  INTERNAL_SERVER_ERROR = 500, // 500 Internal Server Error
  VALIDATION_ERROR = 400, // 400 Bad Request (Validation Errors)
  UNAUTHORIZED = 403, // 403 Forbidden (Access Denied)
}
