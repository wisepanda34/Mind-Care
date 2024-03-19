// stores/auth.store.ts
import axios from "axios";
import { defineStore } from "pinia";
import { ENTER, ROLE } from "~/constants";
import type { IStateAuth, IUser, EnterT, INewUser, MindRequestOptions } from "~/types/auth.type";



export const useAuthStore = defineStore('auth', {
  state: (): IStateAuth => ({
    isOpenAuthModal: false,
    processAuth: ENTER.LOGIN,
    isAuthed: false,
    user: {
      email: '',
      id: '',
      role: '',
    } as IUser
    // user: {
    //   avatar: null,
    //   birthday: null,
    //   email: '',
    //   id: '',
    //   userName: '',
    //   phone: '',
    //   role: null,
    //   registeredAt: null
    // } as IUser
  }),
  actions: {
    async fetchRegistration(newUser:INewUser) {
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
        console.log('response: ', response);
        
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
        if(!response.ok){
          throw new Error('error /api/login')
        }
        const responseData = await response.json();
        console.log('Response data:', responseData);

        this.user.id = responseData.id
        this.user.email = responseData.email
        this.user.role = responseData.role
        this.showUser()
        
      } catch (error) {
        console.error("Error fetching modal data:", error);
      } finally {
        this.toggleAuthModal()
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