// __test__/unit/auth.test.ts
import createUserDto from "~/server/dtos/user-dto";
import { ROLE } from "~/constants";
import type { IUser } from "~/types/auth.type";

const testUser: IUser = {
  email: "test@example.com",
  id: "123456789",
  avatar: null,
  birthday: null,
  userName: null,
  phone: null,
  role: ROLE.USER,
  registeredAt: new Date(),
  isActivated: false,
  activationLink: 'asd'
};

const testUserDto = createUserDto(testUser);

console.log("Test User DTO:", testUserDto);
