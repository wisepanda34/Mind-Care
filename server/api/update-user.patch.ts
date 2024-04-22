// server/api/update-user.patch.ts
import { IUpdateUser } from "~/types/auth.type";
import ClientModel from "../models/Client";
import DoctorModel from "../models/Doctor";
import { AdminModel } from "../models/Admin";
import { compare, hash } from "bcrypt-ts";
import { userUpdate } from "../controllers/updates";

export default defineEventHandler( async(event) => {

  try {
    const data: Partial<IUpdateUser> = await readBody(event);
    console.log('data: ', data);
    const foundUser = await ClientModel.findOne({id: data.id});
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
      
      const updatedUser = await ClientModel.findOneAndUpdate({ id: data.id }, data, { new: true });
      if (!updatedUser) {
        return { status: 500, body: { message: "Problem with DB"}};
      }

      return { status: 200, body: { message: "User updated successfully" }, user: updatedUser };

    // if (!data.id ) {
    //   throw new Error('Missing id in request data');
    // }

    // const updateData: IUpdateUser = {
    //   id: data.id!,
    //   name: data.name || '',
    //   surname: data.surname || '',
    //   role: data.role!,
    //   phone: data.phone || '',
    //   birthday: data.birthday || null,
    //   oldPassword: data.oldPassword || '',
    //   newPassword: data.newPassword || '',
    //   password: data.password || '',
    // };

    // switch(data.role){
    //   case 'client': 
    //     return await userUpdate(updateData, ClientModel)
    //   case 'doctor': 
    //     return await userUpdate(updateData, DoctorModel)
    //   case 'admin': 
    //     return await userUpdate(updateData, AdminModel)
    //   default: return {
    //     status: 400,
    //     body: { message: "update failed"}
    //   }
    // }

  } catch (error) {
    console.log('error update-user', error);
    setResponseStatus(event, 500);
    return { body: { message: "Internal server error" }};
  }
})

