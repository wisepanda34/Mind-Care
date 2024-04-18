// server/models/Review.ts
import { Schema, model } from "mongoose";

const ReviewSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  userId:{
    type: String,
    require: true
  },
  rating: {
    type: Number,
    require: true
  },
  text: {
    type: String,
    require: true
  },
  dateReview: {
    type: Date,
    require: true
  }
});


const ReviewModel = model('reviews', ReviewSchema);
export default ReviewModel