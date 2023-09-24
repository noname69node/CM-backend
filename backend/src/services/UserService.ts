import { Document } from "mongoose";
import Api404Error from "../exceptions/Api404Error";
import { IUser } from "../interfaces/IUser";
import UserModel from "../models/User.model";

class UserService {
  public async findAll(short = false): Promise<IUser[]> {
    const usersData = await UserModel.find()
      .select(short ? "fullname email role status dateOfBirth profileImg lastLogin" : "")
      .lean();
    if (usersData.length === 0) throw new Api404Error("No users found");
    return usersData;
  }

  public async createOne(userData: IUser): Promise<any> {
    //<Omit<IUser, "password">> {
    const createdUser = await UserModel.create(userData);
    const { password, ...responseUser } = createdUser.toObject();

    return responseUser;
  }
}

export default new UserService();
