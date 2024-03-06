import { ROLE, ENTER } from "~/constants";

export type RolesT = ROLE.USER | ROLE.DOCTOR | ROLE.ADMIN
export type EnterT = ENTER.NULL | ENTER.LOGIN | ENTER.REGISTRATON

export interface IStateAuth {
  isOpenAuthModal: boolean;
  processAuth: EnterT;
  isAuthed: boolean;
  user: IUser;
}

export interface IUser {
  avatar?: string | null;
  birthday: string;
  email: string;
  id: string;
  name: string;
  phone: string;
  role: RolesT | null;
  registeredAt: string;
}