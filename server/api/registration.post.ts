// server/api/registration.post.ts
import UserModel from "../models/User";
import { hash}  from 'bcrypt-ts';
import  {v4}  from 'uuid';
// import MailService from "../service/mail-service.js";
import tokenService from "../services/token-service";
import { IUser, IUserDB } from "~/types/auth.type";
import { ROLE } from "~/constants";
import DoctorModel from "../models/Doctor";
// import cookieParser from "cookie-parser";
// import {body} from 'express-validator'


export default defineEventHandler(async (event) => {
  try{
    const data = await readBody(event);
    let candidate = null
    if(data.role === 'user') {
      candidate = await UserModel.findOne({email: data.email});
    } else if(data.role === 'doctor') {
      candidate = await DoctorModel.findOne({email: data.email});
    } else {
      return {
        body: { message: `You cannot change role 'admin' for registration`},
      };
    }
    
    if (candidate) {
      return {
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
      password: data.password,
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