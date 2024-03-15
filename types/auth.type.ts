// types/auth.type.ts
import { ENTER, ROLE } from "~/constants";

// export type RolesT = ROLE.USER | ROLE.DOCTOR | ROLE.ADMIN

export type EnterT = ENTER.NULL | ENTER.LOGIN | ENTER.REGISTRATON

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
  avatar: string | null;
  birthday?: Date | null;
  email: string;
  password?: string,
  id?: string;
  userName: string | null;
  phone: string | null;
  role: ROLE | null;
  registeredAt: Date | null;
  isActivated?: boolean;
  activationLink?: string;
}

export interface IUserDto  {
  email: string;
  id?: string;
  isActivated?: boolean;
}