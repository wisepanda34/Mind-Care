//user-dto.js   data transfer object
// DTO используется для представления данных пользователя в упрощенной форме,
// содержащей только указанные свойства.
import type { IUser, IUserDto } from "~/types/auth.type";

const createUserDto = (model: IUser ): IUserDto => {
  return {
    id: model.id,
    name: model.name,
    email: model.email,
    role: model.role,
    phone: model.phone,
    birthday: model.birthday,
    registeredAt: model.registeredAt
  }
}
export default createUserDto;