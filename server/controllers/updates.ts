// server/controllers/updates.ts
import { IUpdateUser } from "~/types/auth.type";


export const userUpdate = async(data: IUpdateUser, model: any) => {

  try {
    const foundUser = await model.findOne({id: data.id});
      if (!foundUser) {
        return { status: 400, body: { message: "There is no user with this id" }};
      }
      // const isOldPasswordValid = await compare(data.oldPassword, foundUser.password);
      // if(!isOldPasswordValid){
        if (data.oldPassword && data.oldPassword !== foundUser.password) {
          return { status: 400, body: { message: "Old password is wrong!" }};
        }
      // const hashedNewPassword = await hash(data.newPassword, 3);
      // updateData.password = hashedNewPassword;
      const updateData: Partial<IUpdateUser> = {};
      if (data.name && data.name !== '') updateData.name = data.name;
      if (data.surname && data.surname !== '') updateData.surname = data.surname;
      // if (data.role) updateData.role = data.role;
      if (data.phone && data.phone !== '') updateData.phone = data.phone;
      if (data.birthday && data.birthday !== null) updateData.birthday = data.birthday;
      if (data.newPassword && data.newPassword !== '') updateData.password = data.newPassword;

      const updatedUser = await model.findOneAndUpdate({ id: data.id }, data, { new: true });
      if (!updatedUser) {
        return { status: 500, body: { message: "Problem with DB"}};
      }

      return { status: 200, body: { message: "User updated successfully" }, user: updatedUser };
  } catch(error) {
    console.log('updates.ts error: ', error);
    return { status: 500, body: { error: "Internal server error" }}
  }
}
  