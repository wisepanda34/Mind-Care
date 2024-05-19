// server/controllers/registration.ts
import ClientModel from "~/server/models/Client";
import DoctorModel from "../models/Doctor";
import { ISaveNewUser, ISaveNewDoctor } from "~/types/auth.type";
import { parseDate } from "~/utils/convertDate";


export const regClient = async(data: ISaveNewUser) => {
  try {
    const candidate = await ClientModel.findOne({email: data.email});

    if(candidate){
      return {
        status: 400,
        body: { message: `Client with email ${data.email} already exists` }
      }
    }
    const client = {
      name: data.name,
      surname: data.surname,
      email: data.email,
      password: data.password,
      role: data.role,
      phone: data.phone,
      birthday: parseDate(data.birthday) as Date,
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

export const regDoctor = async(data: ISaveNewUser) => {
  try {
    const candidate = await DoctorModel.findOne({email: data.email});
    if(candidate){
      return {
        status: 400,
        body: { message: `Doctor with email ${data.email} already exists` }
      }
    }
    const doctor = {
      name: data.name,
      surname: data.surname,
      email: data.email,
      password: data.password,
      role: data.role,
      phone: data.phone,
      birthday: parseDate(data.birthday) as Date,
      info: {}
      // isActivated: false,
      // activationLink: activationLink
    }

    const newDoctor = new DoctorModel(doctor);
    await newDoctor.save();

    if(newDoctor){
      return { body: { message: 'New doctor registration received successfully'}, newDoctor}
    } else {
      return { status: 500, body: { message: 'registration failed'}}
    }
  } catch (error) {
    console.error('regClient error:', error);
    return { status: 500, body: { message: 'Internal server error' }}
  }
}

