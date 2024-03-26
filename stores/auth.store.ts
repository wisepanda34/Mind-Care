// stores/auth.store.ts
import axios from "axios";
import { defineStore } from "pinia";
import { ENTER, ROLE } from "~/constants";
import type { IStateAuth, IUser, EnterT, RoleT, INewUser, MindRequestOptions } from "~/types/auth.type";



export const useAuthStore = defineStore('auth', {
  state: (): IStateAuth => ({
    isOpenAuthModal: false,
    processAuth: ENTER.LOGIN,
    isAuthed: false,
    user: {
      id: '',
      name: '',
      email: '',
      password: '',
      role: null,
      phone: '',
      birthday: null,
      registeredAt: null,
    } as IUser
  }),
  actions: {
    async fetchRegistration(newUser:IUser) {
      const requestOptions: MindRequestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      };
    
      try {
        const response = await fetch('/api/registration', requestOptions);
        if(!response.ok){
          throw new Error('error')
        }
        
      } catch (error) {
        console.error('Error submitting registration:', error);
      } finally {
        this.processAuth = ENTER.LOGIN
      }
    },

    async fetchLogin(data: INewUser) {

      const requestOptions: MindRequestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };

      try {
        const response = await fetch('/api/login', requestOptions);
        const responseData = await response.json();
        if(!response.ok){
          // throw new Error('error /api/login')
          console.log('!mes', responseData.body.message);
          
          return responseData.body.message
        }
        
        const data = responseData.responseDto

        this.user.id = data.id
        this.user.name = data.name
        this.user.email = data.email
        this.user.role = data.role as RoleT
        this.user.phone = data.phone
        this.user.birthday = data.birthday
        this.user.registeredAt = data.registeredAt
        this.isAuthed = true
        this.toggleAuthModal()
        console.log('mes', responseData.body.message);
        return responseData.body.message

      } catch (error) {
        console.error("Error fetching modal data:", error);
      } 
    },
    async fetchLogout(){
      try {
        await fetch('/api/logout')
        // localStorage.removeItem("access_token");
      } catch(error){
        console.log("Error logging out:", error);
      } finally {
        this.isAuthed = false;
        this.user = {
          id: '',
          name: '',
          email: '',
          password: '',
          role: null,
          phone: '',
          birthday: null,
          registeredAt: null
        } as IUser; 
        navigateTo('/');
      }
    },

    toggleAuthModal(){
      this.isOpenAuthModal = !this.isOpenAuthModal
      if(!this.isOpenAuthModal) this.processAuth = ENTER.LOGIN
    },
    startRegistration(){
      this.processAuth = ENTER.REGISTRATON
    },
    cancelRegistration(){
      this.toggleAuthModal()
      this.processAuth = ENTER.LOGIN
    },
    showUser() {
      console.log('showUser', this.user);
      
    }
  },

})