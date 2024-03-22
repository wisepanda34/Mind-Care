// server/api/doctor-id.get.js

import DoctorModel from "@/server/models/Doctor";
// import { fetchData } from "~/server/api/utils/data-fetcher";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, '_id')
  console.log('id: ',id);
  

  // return fetchData(UserModel, event);
  // try{
  //   const response = await DoctorModel.findOne();

  //   if (!response) {
  //     return { body: { message: "no data from DB" }};
  //   }
  //     return response;
    
  // }catch(e){
  //   console.log('error: ', e);
  // }
  
});