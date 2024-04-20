// types/auth.type.ts
import { ENTER, ROLE } from "~/constants";

// export type RolesT = ROLE.USER | ROLE.DOCTOR | ROLE.ADMIN

export type EnterT = ENTER.NULL | ENTER.LOGIN | ENTER.REGISTRATON
export type RoleT = ROLE.USER | ROLE.DOCTOR | ROLE.ADMIN | null

export interface MindRequestOptions {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'; 
  headers: { [key: string]: string };
  body?: string | FormData | URLSearchParams | ReadableStream<Uint8Array> | null; 
}
export interface IStateAuth {
  isOpenAuthModal: boolean;
  isOpenMessageModal: boolean;
  textMessageModal: string;
  processAuth: EnterT;
  isAuthed: boolean;
  user: IUser;
}

export interface IUser {
  id: string;
  name: string;
  surname?: string;
  email: string;
  password: string;
  role: RoleT | null;
  phone: string;
  birthday: Date | null;
  registeredAt: Date | null;
}
export interface IDoctor extends IUser  {
  experience: number;
  specialization?: string[];
  education?: string[];
  photoLink?: string;
}
export interface IAdmin {
  id: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  role: RoleT | null;
  phone: string;
}
export interface IClient extends IUser {
  interests?: string;
}
export interface IUserDB {
  id: string;
  name: string;
  email: string;
  role: RoleT;
  phone: string;
  birthday: Date | null;
  registeredAt: Date | null;
}
export interface IUserDto  {
  id: string;
  name: string;
  surname?: string;
  email: string;
  role: RoleT;
  phone: string;
  birthday: Date | null;
  registeredAt: Date | null;
}
export interface IDoctorDto extends IUserDto {
  experience: number;
  specialization?: string[];
  education?: string[];
  photoLink?: string;
}
export interface IAdminDto  {
  id: string;
  name: string;
  surname: string;
  email: string;
  role: RoleT;
  phone: string;
}

export interface IUpdateUser {
  id: string;
  email: string;
  name: string;
  surname?: string;
  phone: string;
  birthday: Date | null;
  oldPassword: string;
  newPassword: string;
  password: string;
}
export interface ILogin {
  email: string;
  password: string;
  role: RoleT;
}
export interface IReview {
  name: string;
  userId: string;
  rating: number;
  text: string;
  dateReview: Date;
}


 // isActivated: boolean;
// activationLink: string;