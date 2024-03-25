// server/models/Doctor.ts
import { Schema, Document } from 'mongoose';
import { IClient } from '@/types/auth.type';
import  UserModel from './User';

const DoctorSchema = new Schema({
  surname: { type: String, required: true },
  experience: { type: Number, required: true },
  specialization: { type: Array, default: null }
});


const DoctorModel = UserModel.discriminator<IClient>('doctors', DoctorSchema);
export default DoctorModel