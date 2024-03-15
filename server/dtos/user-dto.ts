//user-dto.js   data transfer object
// DTO используется для представления данных пользователя в упрощенной форме,
// содержащей только указанные свойства.
import type { IUser, IUserDto } from "~/types/auth.type";

const createUserDto = (model: IUser ): IUserDto => {
  return {
    email: model.email,
    // id: model.id || '',
    isActivated: model.isActivated || false,
  }
}
export default createUserDto;