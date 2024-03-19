// server/api/login.post.js

import UserModel from "@/server/models/User";
import createUserDto from "../dtos/user-dto";
import type { IUserDB, IUserDto } from "~/types/auth.type";

// import { fetchData } from "~/server/api/utils/data-fetcher";

export default defineEventHandler(async (event) => {

  // return fetchData(UserModel, event);
  try{
    const { email,  password } = await readBody(event);
    // console.log("login.post.ts", email, password);

    if(!email || !password){
      return {
        status: 400,
        body: { error: 'missing required data' },
      }
    }

    const foundedUser = await UserModel.findOne({email}) as IUserDB;

    if (!foundedUser) {
      return { 
        status: 400,
        body: { message: "there is no user with this email" }
      };
    }
    if(password !== foundedUser.password){
      return { 
        status: 400,
        body: { message: "password is wrong!" }
      };
    }
    const responseDto = createUserDto(foundedUser)//email,id,role
    return responseDto;
    
  }catch(e){
    console.log('error: ', e);
  }
  
});