// server/models/Doctor.ts
import { Schema, Document } from 'mongoose';
import { IClient } from '@/types/auth.type';
import  UserModel  from './User'


const clientSchema = new Schema({
  interests: { type: String },
});

export const ClientModel = UserModel.discriminator<IClient>('clients', clientSchema);