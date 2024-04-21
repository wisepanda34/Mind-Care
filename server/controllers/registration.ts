// server/controllers/registration.ts
import ClientModel from "~/server/models/Client";
import DoctorModel from "../models/Doctor";
import { ISaveNewUser, ISaveNewDoctor } from "~/types/auth.type";


export const regClient = async(fullData: ISaveNewUser) => {
  try {
    const candidate = await ClientModel.findOne({email: fullData.email});

    if(candidate){
      return {
        status: 400,
        body: { message: `Client with email ${fullData.email} already exists` }
      }
    }
    const client: ISaveNewUser = {
      id: fullData.id,
      name: fullData.name,
      surname: fullData.surname,
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
    await newClient.save();

    if(newClient){
      return { body: { message: 'New Client registration received successfully'}, newClient }
    } else {
      return { status: 500, body: { message: 'registration failed'}}
    }
  } catch (error) {
    console.error('regClient error:', error);
    return { status: 500, body: { message: 'Internal server error' }}
  }
}

export const regDoctor = async(fullData: ISaveNewUser) => {
  try {
    const candidate = await DoctorModel.findOne({email: fullData.email});
    if(candidate){
      return {
        status: 400,
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
      return { body: { message: 'New doctor registration received successfully'}}
    } else {
      return { status: 500, body: { message: 'registration failed'}}
    }
  } catch (error) {
    console.error('regClient error:', error);
    return { status: 500, body: { message: 'Internal server error' }}
  }
}

