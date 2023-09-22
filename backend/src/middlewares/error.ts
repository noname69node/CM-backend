import { NextFunction, Request, Response } from "express";
import HttpError from "../exceptions/HttpError";
import { Error as MGError, MongooseError } from "mongoose";
import { MongoError } from "mongodb";

function errorMiddleware(err: Error | HttpError, req: Request, res: Response, next: NextFunction) {
  const status = 500;
  const message: string = "Something went wrong";

  if (err instanceof HttpError) {
    return res.status(err.status).json({ status: false, name: err.name, message: err.message });
  }

  if (err instanceof MGError.ValidationError) {
    const errors = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ status: false, name: err.name, message: errors });
  }

  if ((err as MongoError).code === 11000) {
    return res.status(409).json({ status: false, name: err.name, message: "User with this name already exists" });
  }

  res.status(status).json({ status: false, name: err.name, message });
}

export default errorMiddleware;
