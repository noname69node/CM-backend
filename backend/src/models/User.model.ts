import mongoose, { model } from "mongoose";
import { IUser, UserRole, UserStatus } from "../interfaces/IUser";
import { IContact } from "../interfaces/IContact";

const contactSchema = new mongoose.Schema<IContact>({
  address: String,
  city: String,
  zip: String,
  country: String,
  phoneNumber: String,
});

const userSchema = new mongoose.Schema<IUser>(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: Object.values(UserRole) },
    status: { type: String, required: true, enum: Object.values(UserStatus), default: UserStatus.Active },
    dateOfBirth: Date,
    profileImg: String,
    contact: { type: contactSchema, _id: false },
    lastLogin: Date,
  },
  {
    timestamps: true,
  }
);

const UserModel = model<IUser>("User", userSchema);

export default UserModel;
