// server/api/admin/getUser.ts 

import ClientModel from "~/server/models/Client";
import DoctorModel from "~/server/models/Doctor";
import {AdminModel} from "~/server/models/Admin";
import { IAdmin, IClient, IDoctor } from "~/types/auth.type";
import { string } from "joi";

interface SearchQuery {
  name?: string;
  phone?: string;
  registredStartField?: string;
  registredEndField?: string;
  birthdayStartField?: string;
  birthdayEndField?: string;
}

export default defineEventHandler(async (event) => {
  const queries = getQuery(event)
  console.log('queries ',queries);
  
  const {category, searchUser, searchPhone, registredStart, registredEnd, birthdayStart, birthdayEnd, limit, sortMode} = getQuery(event)
  let categoryArray: string[] = (category as string).split(',');
  console.log('categoryArray ', categoryArray);
  
  
  try{
    let users: any[] = []; 

    const addUsers = async <T>(model: T) => {
      const searchQuery: SearchQuery = {};
      if (typeof searchUser === 'string') searchQuery['name'] = searchUser;
      if (typeof searchPhone === 'string') searchQuery['phone'] = searchPhone;
      if (typeof registredStart === 'string') searchQuery['registredStartField'] = registredStart;
      if (typeof registredEnd === 'string') searchQuery['registredEndField'] = registredEnd;
      if (typeof birthdayStart === 'string') searchQuery['birthdayStartField'] = birthdayStart;
      if (typeof birthdayEnd === 'string') searchQuery['birthdayEndField'] = birthdayEnd;
      // console.log('searchQuery ',searchQuery);

      const foundUsers = await (model as any).find(searchQuery).exec();
      users.push(...foundUsers);
    }
    
    for (const cat of categoryArray) {
      switch (cat) {
        case 'clients':
          await addUsers(ClientModel);
          break;
        case 'doctors':
          await addUsers(DoctorModel);
          break;
        case 'admins':
          await addUsers(AdminModel);
          break;
        default:
          continue;
      }
    }
    console.log('users ', users);
    
    switch (sortMode) {
      case '1':
        users.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
        break;
      case '2':
        users.sort((a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()));
        break;
      case '3':
        users.sort((a, b) => b.registeredAt.localeCompare(a.registeredAt));
        break;
      case '4':
        users.sort((a, b) => a.registeredAt.localeCompare(b.registeredAt));
        break;
      case '5':
          users.sort((a, b) => b.birthday.localeCompare(a.birthday));
          break;
      case '6':
          users.sort((a, b) => a.birthday.localeCompare(b.birthday));
          break;
      default: 
        return;
    }

    switch (limit) {
      case '3':
        users = users.slice(0, 3);
        break;
      case '10':
        users = users.slice(0, 10);
        break;
      case '100':
        users = users.slice(0, 100);
        break;
        default: return;
    }
    console.log('users sort ', users);

    return { body: { users }};
    
  }catch(error){
    setResponseStatus(event, 500);
    return { body: { message: "Internal server error" }};
  }
});