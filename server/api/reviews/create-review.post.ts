// server/api/review/create-review.post.js
import mongoose from "mongoose";
import ReviewModel from "@/server/models/Review";
import UserModel from "~/server/models/Client";
import { IReview } from "~/types/auth.type";
// import { fetchData } from "~/server/api/utils/data-fetcher";

export default defineEventHandler(async (event) => {
  const data = await readBody(event);
  const currentUser = await UserModel.findOne({id: data.id});
  if (!currentUser) {
    setResponseStatus(event, 400);
    return {
      body: { message: `Current user not found`},
    };
  } 

  const newReview = {
    name: currentUser.name,
    userId: currentUser.id,
    rating: data.rating,
    text: data.text,
    dateReview: new Date()
  } as IReview
  
  try{
    const response = await ReviewModel.create(newReview);
    console.log('response ', response);

    if (response) {
      return response;
    } else {
      setResponseStatus(event, 500); 
      return { body: { message: "Failed to create review" }};
    }
    
  } catch (error) {
    console.error('Error creating review:', error);
    setResponseStatus(event, 500); 
    return { body: { message: "Internal server error" }};
  }
});