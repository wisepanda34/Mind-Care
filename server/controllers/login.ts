// server/controllers/login.ts
import UserModel from "@/server/models/User";
import DoctorModel from "../models/Doctor";
import { AdminModel } from "../models/Admin";
import { createUserDto, createDoctorDto, createAdminDto } from "../dtos";
import { compare } from 'bcrypt-ts'


export const loginUser = async(email: string, password: string) => {
  try {
    const foundUser = await UserModel.findOne({email});
    if (!foundUser) {
      return { 
        body: { message: "There is no user with this email" }
      };
    }

    if(password === foundUser.password){
      const data = createUserDto(foundUser)
      return { data, body: { message:'successful authorization'}}
    } else {
      return { body: { message:'Password is wrong!'}}
    }
  } catch(error) {
    console.log('loginUser error: ', error);
  }
}

export const loginDoctor = async(email: string, password: string) => {
  try {
    const foundDoctor = await DoctorModel.findOne({email});
    if (!foundDoctor) {
      return { 
        body: { message: "There is no doctor with this email" }
      };
    }
    if(password === foundDoctor.password){
      const data =  createDoctorDto(foundDoctor)
      return { data, body: { message:'successful authorization'}}
    } else {
      return { body: { message:'Password is wrong!'}}
    }
  } catch(error) {
    console.log('loginDoctor error: ', error);
  }
}

export const loginAdmin = async(email: string, password: string) => {
  try {
    const foundAdmin = await AdminModel.findOne({email});
    if (!foundAdmin) {
      return { 
        body: { message: "There is no admin with this email" }
      };
    }

    if(password === foundAdmin.password){
      const data = createAdminDto(foundAdmin)
      return { data, body: { message:'successful authorization'}}
    } else {
      return { body: { message:'Password is wrong!'}}
    }
  } catch(error) {
    console.log('loginAdmin error: ', error);
  }
}

 // const isPasswordValid = await compare(password, foundUser.password);
    // if(!isPasswordValid){
    //   return { 
    //     body: { message: "Password is wrong!" }
    //   };
    // }