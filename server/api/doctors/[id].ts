// server/api/specialists/doctor-id.get.ts

import DoctorModel from "@/server/models/Doctor";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  
  try{
    const response = await DoctorModel.findOne({id: id});
    if (!response) {
      return { body: { message: "no data from DB" }};
    }
      return response;
  }catch(e){
    setResponseStatus(event, 500);
    return { body: { message: "Internal server error" }};
  }
});