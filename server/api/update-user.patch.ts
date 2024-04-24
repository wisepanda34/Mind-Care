// server/api/update-user.patch.ts
import { IClient, IDoctor, IUpdateUser } from "~/types/auth.type";
import ClientModel from "../models/Client";
import DoctorModel from "../models/Doctor";
import { AdminModel } from "../models/Admin";
import { compare, hash } from "bcrypt-ts";
import { userUpdate } from "../controllers/updates";

export default defineEventHandler( async(event) => {

  try {
    const data: Partial<IUpdateUser> = await readBody(event);
    console.log('data: ', data);
    let foundUser = <IClient | IDoctor | null>{}
    if(data.role === 'client'){
      foundUser = await ClientModel.findOne({id: data.id});
    }
    if(data.role === 'doctor'){
      foundUser = await DoctorModel.findOne({id: data.id});
    }
    if (!foundUser) {
      return { status: 400, body: { message: "There is no user with this id" }};
    }
    if(data.oldPassword && data.newPassword){
      if(data.oldPassword !== foundUser.password){
        return { status: 400, body: { message: "Old password is wrong!" }};
      } else {
        data.password = data.newPassword
      }
    }
    let updatedUser = <IClient | IDoctor | null>{}
    if(data.role === 'client'){
      updatedUser = await ClientModel.findOneAndUpdate({ id: data.id }, data, { new: true });
    }  
    if(data.role === 'doctor'){
      updatedUser = await DoctorModel.findOneAndUpdate({ id: data.id }, data, { new: true });
    }
    if (!updatedUser) {
      return { status: 500, body: { message: "Problem with DB"}};
    }

    return { status: 200, body: { message: "User updated successfully" }, user: updatedUser };


  } catch (error) {
    console.log('error update-user', error);
    setResponseStatus(event, 500);
    return { body: { message: "Internal server error" }};
  }
})

