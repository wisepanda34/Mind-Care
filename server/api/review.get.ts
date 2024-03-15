// server/api/review.get.js

import ReviewModel from "@/server/models/Review";
// import { fetchData } from "~/server/api/utils/data-fetcher";

export default defineEventHandler(async (event) => {

  // return fetchData(UserModel, event);
  try{
    const response = await ReviewModel.find();

    if (!response) {
      return { body: { message: "no data from DB" }};
    }
      return response;
    
  }catch(e){
    console.log('error: ', e);
  }
  
});