// server/api/update-user.patch.ts
// import { S3 } from "aws-sdk";
import { IClient, IDoctor, IUpdateUser } from "~/types/auth.type";
import ClientModel from "../models/Client";
import DoctorModel from "../models/Doctor";
import { AdminModel } from "../models/Admin";
import { compare, hash } from "bcrypt-ts";
import { userUpdate } from "../controllers/updates";
import { H3Event, EventHandlerRequest } from 'h3';

// const s3 = new S3({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.AWS_REGION,
// });
// const readBodyJSON = async (event: H3Event<EventHandlerRequest>) => {
//   const body = await readBody(event);
//   console.log('body: ', body);
  
//   try {
//     const data = JSON.parse(body);
//     return data;
//   } catch (error) {
//     console.error("Error parsing JSON body:", error);
//     return null;
//   }
// };
export default defineEventHandler( async(event) => {

  try {
    const data: Partial<IUpdateUser> = await readBody(event);
    console.log('data: ', data);
    let foundUser: IClient | IDoctor | null = null

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

    let updatedUser: IClient | IDoctor | null = null;
    if(data.role === 'client'){
      updatedUser = await ClientModel.findOneAndUpdate({ id: data.id }, data, { new: true });
    }  
    if(data.role === 'doctor'){
      updatedUser = await DoctorModel.findOneAndUpdate({ id: data.id }, data, { new: true });
    }
    if (!updatedUser) {
      return { status: 500, body: { message: "Problem with DB"}};
    }
    // if (data.photoFile){
    //   const uploadParams = {
    //     Bucket: process.env.AWS_BUCKET_NAME,
    //     Key: `user_photos/${updatedUser.id}_${Date.now()}_${data.photoFile.name}`,
    //     Body: data.photoFile,
    //     ContentType: data.photoFile.type,
    //   };
    //   const s3UploadResponse = await s3.upload(uploadParams).promise();
    //   updatedUser.info.photoLink = s3UploadResponse.Location;
    //   await updatedUser.save();
    // }

    return { status: 200, body: { message: "User updated successfully" }, user: updatedUser };

  } catch (error) {
    console.log('error update-user', error);
    setResponseStatus(event, 500);
    return { body: { message: "Internal server error" }};
  }
})

