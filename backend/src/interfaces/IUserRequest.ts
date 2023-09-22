import { Request } from "express";

interface IUserRequest extends Request {
  user?: object;
}

export default IUserRequest;
