import { Document } from "mongoose";
import { IContact } from "./IContact";

export enum UserRole {
  Admin = "admin",
  User = "user",
  Manager = "manager",
}

export enum UserStatus {
  Active = "active",
  Inactive = "inactive",
  OnVacations = "on_vacations",
  Ill = "ill",
  Other = "other",
}

export interface IUser extends Document {
  fullname: string;
  email: string;
  username: string;
  password: string;
  role: UserRole;
  status: UserStatus;
  dateOfBirth: Date;
  profileImg: string | null;
  contact: IContact;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}
