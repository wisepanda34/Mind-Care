// server/models/Admin.ts
import { Schema, model } from 'mongoose';
import { IAdmin} from '@/types/auth.type';
import { ROLE } from "~/constants";

const AdminSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  surname: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: Object.values(ROLE), required: true },
  phone: { type: String, required: true },
  birthday: { type: Date, required: true },
  registeredAt: { type: Date, required: true },
  avatar: { type: String }

});

export const AdminModel = model<IAdmin>('admins', AdminSchema);