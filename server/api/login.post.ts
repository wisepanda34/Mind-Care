// server/api/login.post.js

import UserModel from "@/server/models/User";
import createUserDto from "../dtos/user-dto";
import type { IUser, IUserDB, IUserDto } from "~/types/auth.type";
import { compare } from 'bcrypt-ts'

// import { fetchData } from "~/server/api/utils/data-fetcher";

export default defineEventHandler(async (event) => {

  // return fetchData(UserModel, event);
  try{
    const { email,  password } = await readBody(event);

    if(!email || !password) {
      setResponseStatus(event, 400);
      return {
        body: { error: 'Missing required data' },
      }
    }

    const foundUser = await UserModel.findOne({email}) as IUser;
    console.log('foundUser: ', foundUser);
    
    if (!foundUser) {
      setResponseStatus(event, 400);
      return { 
        body: { message: "There is no user with this email" }
      };
    }
    const isPasswordValid = await compare(password, foundUser.password);
    if(!isPasswordValid){
      setResponseStatus(event, 400);
      return { 
        body: { message: "Password is wrong!" }
      };
    }
    const responseDto = createUserDto(foundUser)//email,id,role
    return {
      responseDto,
      body: { message: "Password is ok!" }
    }
    
  }catch(e){
    console.log('error: ', e);
  }
});