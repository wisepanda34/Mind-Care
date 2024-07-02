// server/api/review.get.js

import ReviewModel from "@/server/models/Review";
// import { fetchData } from "~/server/api/utils/data-fetcher";

export default defineEventHandler(async (event) => {

  try{
    const response = await ReviewModel.find();
    
    if (!response) {
      return { body: { message: "no data from DB" }};
    }
      return response;
    
  }catch(error){
    console.log('review.get.js error: ', error);
    setResponseStatus(event, 500); 
    return { body: { message: "Internal server error" }};
  }
  
});