// server/api/update-user.patch.ts
import { IUpdateUser } from "~/types/auth.type";
import UserModel from "../models/User";
import { compare, hash } from "bcrypt-ts";



export default defineEventHandler( async(event) => {

  try {
    const data: Partial<IUpdateUser> = await readBody(event);
    if (!data.id) {
      throw new Error('Missing id in request data');
    }

    const updateData: Partial<IUpdateUser> = {};
    updateData.id = data.id 
    if (data.name) {
      updateData.name = data.name;
    }
    if (data.phone) {
      updateData.phone = data.phone;
    }
    if (data.birthday) {
      updateData.birthday = data.birthday;
    }
    if (data.oldPassword && data.newPassword) {
      const foundUser = await UserModel.findOne({id: data.id});
      if (!foundUser) {
        setResponseStatus(event, 400);
        return {
          body: { message: "There is no user with this id" }
        };
      }

      const isOldPasswordValid = await compare(data.oldPassword, foundUser.password);
      if(!isOldPasswordValid){
        setResponseStatus(event, 400);
        return { 
          body: { message: "Old password is wrong!" }
        };
      }
      const hashedNewPassword = await hash(data.newPassword, 3);
      updateData.password = hashedNewPassword;
    }

    const updatedUser = await UserModel.findOneAndUpdate({ id: data.id }, updateData, { new: true });
    if (!updatedUser) {
      throw new Error('User not found');
    }

    return {
      body: { message: "User updated successfully", user: updatedUser }
    };

  } catch (error) {
    console.log('error update-user', error);
  }
})