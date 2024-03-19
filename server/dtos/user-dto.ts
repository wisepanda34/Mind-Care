//user-dto.js   data transfer object
// DTO используется для представления данных пользователя в упрощенной форме,
// содержащей только указанные свойства.
import type { IUserDB, IUserDto } from "~/types/auth.type";

const createUserDto = (model: IUserDB ): IUserDto => {
  return {
    email: model.email,
    id: model._id,
    role: model.role
  }
}
export default createUserDto;