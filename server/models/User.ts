// server/models/User.ts
import { Schema, model } from "mongoose";
import { ROLE } from "~/constants";

const UserSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: Object.values(ROLE), required: true },
  phone: { type: String, required: true },
  birthday: { type: Date, required: true },
  registeredAt: { type: Date, required: true },
  // avatar: { type: String, default: null },
});

const UserModel = model('users', UserSchema);
export default UserModel