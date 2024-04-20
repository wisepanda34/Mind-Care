//user-dto.js   data transfer object
// DTO используется для представления данных пользователя в упрощенной форме,
// содержащей только указанные свойства.
import type { IUser, IDoctor, IAdmin, IClientDto, IDoctorDto, IAdminDto } from "~/types/auth.type";

export const createUserDto = (model: IUser ): IClientDto => {
  return {
    id: model.id,
    name: model.name,
    surname: model.surname,
    email: model.email,
    role: model.role,
    phone: model.phone,
    birthday: model.birthday,
    registeredAt: model.registeredAt,
  }
};

export const createDoctorDto = (model: IDoctor ): IDoctorDto => {
  return {
    id: model.id,
    name: model.name,
    surname: model.surname,
    email: model.email,
    role: model.role,
    phone: model.phone,
    birthday: model.birthday,
    registeredAt: model.registeredAt,
    info: model.info
  }
}

export const createAdminDto = (model: IAdmin ): IAdminDto => {
  return {
    id: model.id,
    name: model.name,
    surname: model.surname,
    email: model.email,
    role: model.role,
    phone: model.phone,
    birthday: model.birthday,
    registeredAt: model.registeredAt
  }
}