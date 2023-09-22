import { Response, NextFunction } from "express";
import IUserRequest from "../interfaces/IUserRequest";

export const auth = (req: IUserRequest, res: Response, next: NextFunction) => {
  req.user = { fullname: "Paweł", role: "admin" };
  console.log(req.user);
  next();
};
