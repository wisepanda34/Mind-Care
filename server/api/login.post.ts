// server/api/login.post.js

import { loginClient, loginDoctor, loginAdmin } from '../controllers/login'

// import { fetchData } from "~/server/api/utils/data-fetcher";

export default defineEventHandler(async (event) => {
  const { email,  password, role } = await readBody(event);
  if(!email || !password || !role) {
    setResponseStatus(event, 400);
    return {
      body: { message: 'Missing required data' },
    }
  }
  // return fetchData(UserModel, event);

  try{

    switch(role){
      case 'user':
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
    console.log('login.post.js error: ', error);
    setResponseStatus(event, 500);
    return { body: { message: "Internal server error" }};
  }
});