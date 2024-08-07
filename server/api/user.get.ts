// server/api/user.get.js

import UserModel from "~/server/models/Client";
// import { fetchData } from "~/server/api/utils/data-fetcher";

export default defineEventHandler(async (event) => {

  // return fetchData(UserModel, event);
  try{
    const response = await UserModel.find();

    if (!response) {
      return { body: { message: "no data from DB" }};
    }
      return response;
    
  }catch(e){
    console.log('error: ', e);
  }
  
});