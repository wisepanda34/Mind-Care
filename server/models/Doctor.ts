// server/models/Doctor.ts
import { Schema, model } from 'mongoose';
import { ROLE } from "~/constants";
import { IDoctor, IUser, ImageType, IInfo } from '@/types/auth.type';

const InfoSchema = new Schema<IInfo>({
  education: { type: [String], default: [] },
  experience: { type: Number },
  specialization: { type: [String], default: [] },
  photoLink: { type: Buffer} // Мы используем Schema.Types.Mixed, чтобы принять любой тип из ImageType
});
const DoctorSchema = new Schema<IDoctor>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  surname: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: Object.values(ROLE), required: true },
  phone: { type: String, required: true },
  birthday: { type: Date, required: true },
  registeredAt: { type: Date, required: true },
  avatar: { type: String },
  info: InfoSchema // Используем ранее определенную схему InfoSchema для поля info
});

const DoctorModel = model<IDoctor>('doctors', DoctorSchema);
export default DoctorModel