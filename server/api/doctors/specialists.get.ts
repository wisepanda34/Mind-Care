// server/api/doctors/specialists.get.js

import DoctorModel from "@/server/models/Doctor";
// import { fetchData } from "~/server/api/utils/data-fetcher";

export default defineEventHandler(async (event) => {

  // return fetchData(UserModel, event);
  try{
    const response = await DoctorModel.find();

    if (!response || response.length === 0) {
      return { body: { message: "no data from DB" }};
    }
      return response;
    
  }catch(e){
    setResponseStatus(event, 500);
    return { body: { message: "Internal server error" }};
  }
});