import { ROLE } from "~/constants";

export type RolesT = ROLE.USER | ROLE.DOCTOR | ROLE.ADMIN

export interface IStateAuth {
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