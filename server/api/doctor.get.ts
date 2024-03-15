// server/api/doctor.get.js

import DoctorModel from "@/server/models/Doctor";
// import { fetchData } from "~/server/api/utils/data-fetcher";

export default defineEventHandler(async (event) => {

  // return fetchData(UserModel, event);
  try{
    const response = await DoctorModel.find();

    if (!response) {
      return { body: { message: "no data from DB" }};
    }
      return response;
    
  }catch(e){
    console.log('error: ', e);
  }
  
});