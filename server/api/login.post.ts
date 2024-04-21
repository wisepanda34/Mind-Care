// server/api/login.post.js

import { loginClient, loginDoctor, loginAdmin } from '../controllers/login'
import { validateLogin } from "../validators/validator";


// import { fetchData } from "~/server/api/utils/data-fetcher";

export default defineEventHandler(async (event) => {
  const data = await readBody(event);
  const { error } = validateLogin(data);
  if (error) {
    setResponseStatus(event, 400);
    return { body: { message: error.details[0].message } };
  }
  // return fetchData(UserModel, event);
  const {email, password, role} = data

  try {
    switch(role){
      case 'client':
        return await loginClient(email, password)
      case 'doctor':
        return await loginDoctor(email, password)
      case 'admin':
        return await loginAdmin(email, password)
      default: return {
        body: { message: "Found nothing" }
      }
    }

  }catch(error){
    setResponseStatus(event, 500);
    return { body: { message: "Internal server error" }};
  }
});