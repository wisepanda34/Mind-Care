// types/auth.type.ts
import { ENTER, ROLE } from "~/constants";

// export type RolesT = ROLE.USER | ROLE.DOCTOR | ROLE.ADMIN

export type EnterT = ENTER.NULL | ENTER.LOGIN | ENTER.REGISTRATON
export type RoleT = ROLE.USER | ROLE.DOCTOR | ROLE.ADMIN

export interface INewUser {
  email: string;
  password: string;
}

export interface MindRequestOptions {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'; 
  headers: { [key: string]: string };
  body?: string | FormData | URLSearchParams | ReadableStream<Uint8Array> | null; 
}

export interface IStateAuth {
  isOpenAuthModal: boolean;
  processAuth: EnterT;
  isAuthed: boolean;
  user: IUser;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: RoleT;
  phone: string;
  birthday: Date;
  registeredAt: Date;
}

export interface IClient extends IUser {
  interests?: string;
}

export interface IUserDB {
  email: string;
  password?: string,
  _id: string;
  role: string;
}

export interface IUserDto  {
  email: string;
  id?: string;
  role: string;
}

export interface IDoctor  {
  id: string;
  name: string;
  email: string;
  password: string;
  role: RoleT;
  phone: string;
  birthday: Date;
  registeredAt: Date;
  surname: string;
  experience?: number;
  specialization?: string[];
}
 // isActivated: boolean;
// activationLink: string;

export interface IDoctorDto {
  name: string;
  surname: string;
  email: string;
  role: string;
}
