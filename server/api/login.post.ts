// server/api/login.post.js

import { loginUser, loginDoctor, loginAdmin } from '../controllers/login'

// import { fetchData } from "~/server/api/utils/data-fetcher";

export default defineEventHandler(async (event) => {

  // return fetchData(UserModel, event);
  try{
    const { email,  password, role } = await readBody(event);
    if(!email || !password || !role) {
      setResponseStatus(event, 400);
      return {
        body: { message: 'Missing required data' },
      }
    }

    switch(role){
      case 'user':
        return loginUser(email, password)
      case 'doctor':
        return loginDoctor(email, password)
      case 'admin':
        return loginAdmin(email, password)
      default: return {
        body: { message: "Found nothing" }
      }
    }
    
  }catch(error){
    setResponseStatus(event, 500)
    console.log('login.post.js error: ', error);
  }
});