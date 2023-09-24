import { NextFunction, Request, Response } from "express";
import { MongooseError, isValidObjectId } from "mongoose";
import UserModel from "../models/User.model";
import Api404Error from "../exceptions/Api404Error";
import UserService from "../services/UserService";

class UserController {
  public async getAll(req: Request, res: Response, next: NextFunction) {
    const short = req.query.short === "true";

    try {
      const users = await UserService.findAll(short);
      res.json(users);
    } catch (error) {
      next(error);
    }
  }

  public getById(req: Request, res: Response) {
    const userId = req.params.id;
    res.send(`Show user with id: ${userId}`);
  }

  public getSelf(req: Request, res: Response) {
    res.send(`Show singed in user:`);
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    const userData = req.body;
    try {
      //const createdUser = await UserModel.create(userData);
      //const { password, ...responseUser } = createdUser.toObject();
      const responseUser = await UserService.createOne(userData);
      res.status(201).json(responseUser);
    } catch (error) {
      next(error);
    }
    //res.send(`Create user ${userData}`);
  }

  public async update(req: Request, res: Response) {
    const userId = req.params.id;
    const userData = req.body;
    res.send(`Update user by id: ${userId}, with data ${userData}`);
  }

  public updateSelf(req: Request, res: Response) {
    const userId = req.params.id;
    const userData = req.body;
    res.send(`Update singed in user, with data ${userData}`);
  }

  public delete(req: Request, res: Response) {
    const userId = req.params.id;
    res.send(`Delete user by id: ${userId}`);
  }

  public validateId = (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    if (!isValidObjectId(id)) throw new MongooseError("invalid id");
    next();
  };
}

export default UserController;
