// server/models/Review.ts
import { Schema, model } from "mongoose";

const ReviewSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  idUser:{
    //означает, что ожидается идентификатор объекта (ObjectId) MongoDB.
    // Это создает связь между токеном и пользователем.
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  text: {
    type: String,
    require: true
  },
});


const ReviewModel = model('reviews', ReviewSchema);
export default ReviewModel