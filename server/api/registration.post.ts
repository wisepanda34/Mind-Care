// server/api/registration.post.ts
import UserModel from "../models/User";
import { hash}  from 'bcrypt-ts';
import  {v4}  from 'uuid';
// import MailService from "../service/mail-service.js";
import tokenService from "../services/token-service";
import { IUser, IUserDB, INewUser } from "~/types/auth.type";
import { ROLE } from "~/constants";
import createUserDto from "../dtos/user-dto";
// import cookieParser from "cookie-parser";
// import {body} from 'express-validator'


export default defineEventHandler(async (event) => {
  try{
    const data = await readBody(event);
    console.log('data: ', data);
    
    
    const candidate = await UserModel.findOne({email: data.email});
    if (candidate) {
      return {
        status: 400,
        body: { error: `User with email ${data.email} already exists` },
      };
    }
    // const secretKey = process.env.JWT_ACCESS_SECRET
    const hashPassword = await hash(data.password, 3)
    
    //уникальный идентификатор для активации учетной записи пользователя через его имэйл
    // const activationLink = v4() //af914236-e488-47fb-925e-c3fb6c762f0b
    // console.log('activationLink: ', activationLink);
    

    const user: IUser = {
      id: data.id,
      email: data.email,
      password: hashPassword,
      name: data.name,
      birthday: data.birthday,
      phone: data.phone,
      role: ROLE.USER,
      registeredAt: data.registeredAt,
      // isActivated: false,
      // activationLink: activationLink
    }

    //сохраняем пользователя в БД
    const newUser = new UserModel(user);
    //отправка ссылки активации на имейл пользователя
    // console.log('MailService')
    // const path = `${process.env.API_URL}/api/activate/${activationLink}`
    // await MailService.sendActivationMail(email, path)
    // await MailService.sendActivationMail(email, activationLink)

    //dto используем, чтобы не светить пароль
    // const userDto = createUserDto(newUser); // id, email, isActivated
    // console.log("userDto: ", userDto);
    //генерируем токены
    // const tokens = tokenService.generateTokens({...userDto})
    // console.log("tokens: ", tokens);

    await newUser.save();
    // console.log("save newUser");
    //сохраняем refreshToken в БД
    // await tokenService.saveToken(userDto.id, tokens.refreshToken)


    return {
      status: 200,
      body: { message: 'Registration received successfully'},
    };

  }catch (error){
    console.error('Error registration.js:', error);
    return {
      status: 500,
      body: { error: 'Internal Server Error' },
    };
  }
});