// constants/index.ts
export enum ROLE {
  CLIENT = 'client',
  DOCTOR = 'doctor',
  ADMIN = 'admin'
}

export const enum ENTER {
  NULL = "null",
  LOGIN = "login",
  REGISTRATON = "registration"
}

export const rolesRegistration = ["client", "doctor"]
export const phoneRegex = /^(\d{3}[\s-]?){2}\d{2}\s?\d{2}$/;