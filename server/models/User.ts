// server/models/User.ts
import { Schema, model } from "mongoose";
import { ROLE } from "~/constants";
import { IUser } from "~/types/auth.type";

const UserSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: Object.values(ROLE), required: true },
  phone: { type: String, required: true },
  birthday: { type: Date, required: true },
  registeredAt: { type: Date, required: true },
});

const UserModel = model<IUser>('users', UserSchema);
export default UserModel