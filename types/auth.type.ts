// types/auth.type.ts
import { ENTER, ROLE } from "~/constants";

// export type RolesT = ROLE.USER | ROLE.DOCTOR | ROLE.ADMIN

export type EnterT = ENTER.NULL | ENTER.LOGIN | ENTER.REGISTRATON
export type RoleT = ROLE.CLIENT | ROLE.DOCTOR | ROLE.ADMIN | null

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
  role: RoleT | null;
  phone: string;
  birthday: Date | null;
  registeredAt: Date | null;
  avatar?: string;
  info?: IInfo | null;
}

export interface IInfo {
  education?: string[] ;
  experience?: number;
  specialization?: string[];
  photoLink?: ImageType;
}

export type ImageType = string | ArrayBuffer | null;

export interface FileInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
  files: FileList | null;
}

export interface INewUser {
  name: string;
  surname?: string;
  email: string;
  password: string
  role: RoleT | null;
  phone: string;
  birthday: Date | null;
}
export interface ISaveNewUser extends IUser{
  id: string;
  password: string
}

export interface ISaveNewDoctor extends ISaveNewUser{
  info: IInfo 
}

export interface IClient extends IUser {
  password: string;
}

export interface IDoctor extends IUser  {
  password: string;
}

export interface IAdmin extends IUser {
  password: string;
}

export interface IClientDB {
  id: string;
  name: string;
  email: string;
  role: RoleT;
  phone: string;
  birthday: Date | null;
  registeredAt: Date | null;
}
export interface IClientDto  { //в принципе тот же самый IUser
  id: string;
  name: string;
  surname?: string;
  email: string;
  role: RoleT;
  phone: string;
  birthday: Date | null;
  registeredAt: Date | null;
}
export interface IDoctorDto extends IClientDto {
  info:{
    experience?: number;
    specialization?: string[];
    education?: string[];
    photoLink?: ImageType;
  }
}
export interface IAdminDto { //в принципе тот же самый IUser
  id: string;
  name: string;
  surname?: string;
  email: string;
  role: RoleT;
  phone: string;
  birthday: Date | null;
  registeredAt: Date | null;
}

export interface IUpdateUser {
  id: string;
  name: string;
  surname: string;
  role: RoleT;
  phone: string;
  birthday: Date | null;
  oldPassword: string;
  newPassword: string;
  password: string;
  info: IInfo;
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
export interface IFile {
  file: File;
  validSize: boolean;
  validExtension: boolean;
}


 // isActivated: boolean;
// activationLink: string;