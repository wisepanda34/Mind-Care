// server/models/Doctor.ts
import { Schema, model } from "mongoose";

const DoctorSchema = new Schema({
  id:{
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: null
  },
  birthday: {
    type: Date,
    default: null
  },
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  specialization: {
    type: Array,
    default: null
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    default: 'doctor',
  },
  registeredAt: {
    type: Date,
    required: true,
  },
  isActivated: {
    type: Boolean,
    default: false,
  },
  activationLink: {
    type: String,
    default: null
  }
});


const DoctorModel = model('doctors', DoctorSchema);
export default DoctorModel