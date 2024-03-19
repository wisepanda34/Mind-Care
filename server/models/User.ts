// server/models/User.ts
import { Schema, model } from "mongoose";
import { ROLE } from "~/constants";

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String, 
    enum: Object.values(ROLE),
    required: true,
  }
});
// const UserSchema = new Schema({
//   avatar: {
//     type: String,
//     default: null
//   },
//   birthday: {
//     type: Date,
//     default: null
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   userName: {
//     type: String,
//     required: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   phone: {
//     type: String,
//     required: true,
//   },
//   role: {
//     type: String, 
//     enum: Object.values(ROLE),
//     required: true,
//   },
//   registeredAt: {
//     type: Date,
//     required: true,
//   },
//   isActivated: {
//     type: Boolean,
//     default: false,
//   },
//   activationLink: {
//     type: String,
//     default: undefined
//   }
// });


const UserModel = model('users', UserSchema);
export default UserModel