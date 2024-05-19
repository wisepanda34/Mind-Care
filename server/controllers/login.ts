// server/controllers/login.ts
import ClientModel from "~/server/models/Client";
import DoctorModel from "../models/Doctor";
import { AdminModel } from "../models/Admin";
import { createUserDto, createDoctorDto, createAdminDto } from "../dtos";
import { compare } from 'bcrypt-ts'


export const loginClient = async(email: string, password: string) => {
  
  try {
    const foundUser = await ClientModel.findOne({email});

    if (!foundUser) {
      return { status: 400, body: { message: "There is no user with this email" }};
    }
    if(password === foundUser.password){
      const user = createUserDto(foundUser)
      console.log('user ', user);
      

      return { status: 200, body: { message:'successful authorization' }, user }
    } else {
      return { status: 400, body: { message:'Password is wrong!'}}
    }
  } catch(error) {
    console.log('loginUser error: ', error);
    return { status: 500, body: { error: "Internal server error" }}
  }
}

export const loginDoctor = async(email: string, password: string) => {
  try {
    const foundDoctor = await DoctorModel.findOne({email});
    if (!foundDoctor) {
      return { status: 400, body: { message: "There is no user with this email" }};
    }
    if(password === foundDoctor.password){
      const user =  createDoctorDto(foundDoctor)
      return { status: 200, body: { message:'successful authorization' }, user }
    } else { 
      return { status: 400, body: { message:'Password is wrong!'}}
    }
    
  } catch(error) {
    console.log('loginDoctor error: ', error);
    return {status: 500, body: { error: "Internal server error" }}
  }
}

export const loginAdmin = async(email: string, password: string) => {
  try {
    const foundAdmin = await AdminModel.findOne({email});
    if (!foundAdmin) {
      return { status: 400, body: { message: "There is no user with this email" }};
    }
    if(password === foundAdmin.password){
      const user = createAdminDto(foundAdmin)
      return { status: 200, body: { message:'successful authorization' }, user }
    } else {
      return { status: 400, body: { message:'Password is wrong!'}}
    }
  } catch(error) {
    console.log('loginAdmin error: ', error);
    return {status: 500, body: { error: "Internal server error" }}
  }
}

 // const isPasswordValid = await compare(password, foundUser.password);
    // if(!isPasswordValid){
    //   return { 
    //     body: { message: "Password is wrong!" }
    //   };
    // }