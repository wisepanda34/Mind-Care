// server/api/registration.post.ts
import UserModel from "../models/Client";
import { hash}  from 'bcrypt-ts';
import  {v4}  from 'uuid';
import { validate } from "email-validator";
// import MailService from "../service/mail-service.js";
import tokenService from "../services/token-service";
import { ISaveNewUser, IClientDB } from "~/types/auth.type";
import { ROLE } from "~/constants";
import DoctorModel from "../models/Doctor";
import { regClient, regDoctor } from "../controllers/registration";
import { validateReg } from "../validators/validator";
// import cookieParser from "cookie-parser";
// import {body} from 'express-validator'


export default defineEventHandler(async (event) => {
  const data = await readBody(event);
  
  const { error } = validateReg(data);
  if (error) {
    setResponseStatus(event, 400);
    return { body: { message: error.details[0].message } };
  }

  const fullData = {
    ...data,
    id: new Date().getTime().toString(),
    registeredAt: new Date() 
  } as ISaveNewUser

  try {
    switch(data.role){
      case 'client':
        return await regClient(fullData)
      case 'doctor':
        return await regDoctor(fullData)
      case 'admin':
        return {body: { message: "You cannot to be admin" }}
      default: return {
        body: { message: "The problem with role" }
      }
    }
    
    // const secretKey = process.env.JWT_ACCESS_SECRET
    // const hashPassword = await hash(data.password, 3)
    
    //уникальный идентификатор для активации учетной записи пользователя через его имэйл
    // const activationLink = v4() //af914236-e488-47fb-925e-c3fb6c762f0b
    // console.log('activationLink: ', activationLink);

    
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

    // await newUser.save();
    // console.log("save newUser");
    //сохраняем refreshToken в БД
    // await tokenService.saveToken(userDto.id, tokens.refreshToken)

  }catch (error){
    console.error('Error registration.js:', error);
    setResponseStatus(event, 500);
    return { body: { message: "Internal server error" }};
  }
});