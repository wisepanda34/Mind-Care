// server/controllers/registration.ts
import ClientModel from "~/server/models/Client";
import DoctorModel from "../models/Doctor";
import { AdminModel } from "../models/Admin";
import { ISaveNewUser, ISaveNewDoctor } from "~/types/auth.type";


export const regClient = async(fullData: ISaveNewUser) => {
  try {
    const candidate = await ClientModel.findOne({email: fullData.email});
    if(candidate){
      return{
        body: { message: `Client with email ${fullData.email} already exists` }
      }
    }
    const client: ISaveNewUser = {
      id: fullData.id,
      name: fullData.name,
      surname: fullData.name,
      email: fullData.email,
      password: fullData.password,
      role: fullData.role,
      phone: fullData.phone,
      birthday: fullData.birthday,
      registeredAt: fullData.registeredAt,
      // isActivated: false,
      // activationLink: activationLink
    }

    const newClient = new ClientModel(client);
    console.log('newClient: ', newClient);

    if(newClient){
      return {body: { message: 'New Client registration received successfully'}}
    } else {
      return {body: { message: 'registration failed'}}
    }
  } catch(e) {
    console.log('regClient error :', e);
    return e
  }
}

export const regDoctor = async(fullData: ISaveNewUser) => {
  try {
    const candidate = await DoctorModel.findOne({email: fullData.email});
    if(candidate){
      return{
        body: { message: `Doctor with email ${fullData.email} already exists` }
      }
    }
    const doctor: ISaveNewDoctor = {
      id: fullData.id,
      name: fullData.name,
      surname: fullData.surname,
      email: fullData.email,
      password: fullData.password,
      role: fullData.role,
      phone: fullData.phone,
      birthday: fullData.birthday,
      registeredAt: fullData.registeredAt,
      info: {}
      // isActivated: false,
      // activationLink: activationLink
    }

    const newDoctor = new DoctorModel(doctor);
    console.log('newDoctor: ', newDoctor);

    if(newDoctor){
      return {body: { message: 'New doctor registration received successfully'}}
    } else {
      return {body: { message: 'registration failed'}}
    }
  } catch(e) {
    console.log('regDoctor error :', e);
    return e
  }
}

