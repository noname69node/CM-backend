import { MongooseError } from "mongoose";

class HttpError extends Error implements MongooseError {
  //name: string;
  status: number;
  message: string;
  code: number;

  isOperational: boolean;

  constructor(status: number, message: string, isOperational: boolean = true) {
    super(message);
    this.name = "HttpError";
    this.status = status;
    this.message = message;
    this.code = 0;

    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default HttpError;
