// server/models/Client.ts
import { Schema, model } from "mongoose";
import { ROLE } from "~/constants";
import { IClient } from "~/types/auth.type";

const ClientSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  surname: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: Object.values(ROLE), required: true },
  phone: { type: String, required: true },
  birthday: { type: Date, require: true },
  registeredAt: { type: Date, require: true },
  avatar: { type: String },
  info: { type: Object }
});

const ClientModel = model<IClient>('users', ClientSchema);
export default ClientModel