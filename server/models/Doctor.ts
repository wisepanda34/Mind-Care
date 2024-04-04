// server/models/Doctor.ts
import { Schema, model } from 'mongoose';
import { ROLE } from "~/constants";
import { IDoctor, IUser } from '@/types/auth.type';
import  UserModel from './User';

const DoctorSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: Object.values(ROLE), required: true },
  phone: { type: String, required: true },
  birthday: { type: Date, required: true },
  registeredAt: { type: Date, required: true },
  surname: { type: String, required: true },
  experience: { type: Number, required: true },
  specialization: { type: Array, default: [] },
  education: { type: Array, default: [] },
  photoLink: { type: String }
});


const DoctorModel = model<IDoctor>('doctors', DoctorSchema);
export default DoctorModel