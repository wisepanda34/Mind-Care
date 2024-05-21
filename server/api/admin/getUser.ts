// server/api/admin/getUser.ts 

import ClientModel from "~/server/models/Client";
import DoctorModel from "~/server/models/Doctor";
import {AdminModel} from "~/server/models/Admin";
import { IAdmin, IClient, IDoctor, IUser } from "~/types/auth.type";
import { string } from "joi";

interface SearchQuery {
  name?: string;
  phone?: string;
  registeredAt?: { $gte?: Date; $lte?: Date }; 
  birthday?: { $gte?: Date; $lte?: Date };
  $or?: { [key: string]: any }[];
}

export default defineEventHandler(async (event) => {
  const queries = getQuery(event)
  // console.log('queries ',queries);
  
  const {category, searchUser, searchPhone, registredStart, registredEnd, birthdayStart, birthdayEnd, limit, sortMode} = getQuery(event)
  let categoryArray: string[] = (category as string).split(',');
  // console.log('categoryArray ', categoryArray);
  
  
  try{
    let users: IUser[] = []; 

    const addUsers = async <T>(model: T) => {
      const searchQuery: SearchQuery = {};
      if (typeof searchUser === 'string') {
        const regex = new RegExp(searchUser, 'i'); 
        searchQuery['$or'] = [
          { name: regex },
          { surname: regex },
          { email: regex },
        ];
      }
      if (typeof searchPhone === 'string') searchQuery['phone'] = searchPhone;

      if (typeof registredStart === 'string' || typeof registredEnd === 'string') {
        searchQuery['registeredAt'] = {};
        if (typeof registredStart === 'string') {
          searchQuery['registeredAt']!.$gte = new Date(registredStart);
        }
        if (typeof registredEnd === 'string') {
          searchQuery['registeredAt']!.$lte = new Date(registredEnd);
        }
      }

      if (typeof birthdayStart === 'string' || typeof birthdayEnd === 'string') {
        searchQuery['birthday'] = {};
        if (typeof birthdayStart === 'string') {
          searchQuery['birthday']!.$gte = new Date(birthdayStart);
        }
        if (typeof birthdayEnd === 'string') {
          searchQuery['birthday']!.$lte = new Date(birthdayEnd);
        }
      }
      console.log('searchQuery ',searchQuery);

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
    
    switch (sortMode) {
      case '1':
        users.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
        break;
      case '2':
        users.sort((a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()));
        break;
      case '3':
        users.sort((a, b) => Date.parse(a.registeredAt) - Date.parse(b.registeredAt));
        break;
      case '4':
        users.sort((a, b) => Date.parse(b.registeredAt) - Date.parse(a.registeredAt));
        break;
      case '5':
        users.sort((a, b) => Date.parse(a.birthday) - Date.parse(b.birthday));
        break;
      case '6':
        users.sort((a, b) => Date.parse(b.birthday) - Date.parse(a.birthday));
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

    return { users };
    
  }catch(error){
    setResponseStatus(event, 500);
    return { body: { message: "Internal server error" }};
  }
});