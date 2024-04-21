// stores/auth.store.ts
import axios from "axios";
import { defineStore } from "pinia";
import { ENTER, ROLE } from "~/constants";
import type { IStateAuth, IUser, INewUser, IUpdateUser, EnterT, RoleT, MindRequestOptions, ILogin } from "~/types/auth.type";



export const useAuthStore = defineStore('auth', {
  state: (): IStateAuth => ({
    isOpenAuthModal: true,
    isOpenMessageModal: false,
    textMessageModal: '',
    processAuth: ENTER.LOGIN,
    isAuthed: false,
    user: {
      id: '',
      name: '',
      surname: '',
      email: '',
      role: null,
      phone: '',
      birthday: null,
      registeredAt: null,
    } 
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
        const responseJson = await response.json()
        this.openMessageModal(responseJson.body.message)

        if(!response.ok){
          throw new Error('error')
        }
        return responseJson.body.message
      } catch (error) {
        console.error('Error submitting registration:', error);
      } finally {
        this.processAuth = ENTER.LOGIN
      }
    },
    async fetchUpdateUser(newData: Partial<IUpdateUser>){

      const data: Partial<IUpdateUser> = {
        ...newData,
        id: this.user.id,
      };

      const requestOptions: MindRequestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      };
      try {
        const response = await fetch('/api/update-user', requestOptions);
        const responseJson = await response.json();
        this.openMessageModal(responseJson.body.message)

        if(!response.ok){
          console.log('fetchUpdateUser !response.ok');
        }
        const resUser = responseJson.body.user
        
        this.$patch({
          user: {
            id: resUser.id,
            name: resUser.name,
            email: resUser.email,
            role: resUser.role as RoleT,
            phone: resUser.phone,
            birthday: new Date(resUser.birthday),
            registeredAt: resUser.registeredAt,
          }
        });
        

      } catch (error) {
        console.error("Error fetching modal data:", error);
      }
    },
    async fetchLogin(data: ILogin) {
      
      const requestOptions: MindRequestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      };
      
      try {
        const response = await fetch('/api/login', requestOptions);
        const responseJson = await response.json();
        console.log('responseJson :', responseJson);
        
        this.openMessageModal(responseJson.body.message)

        if(!response.ok){
          return responseJson.body.message
        }
        const data = responseJson.data

        this.$patch({
          user: {
            id: data.id,
            name: data.name,
            surname: data.surname,
            email: data.email,
            role: data.role as RoleT,
            phone: data.phone,
            birthday: new Date(data.birthday),
            registeredAt: data.registeredAt,
          }
        });
        
        this.isAuthed = true
        this.toggleAuthModal()
        return responseJson.body.message

      } catch (error) {
        console.error("Error fetching modal data:", error);
      } 
    },
    async fetchLogout(){
      try {
        const response = await fetch('/api/logout')
        const responseJson = await response.json();
        this.openMessageModal(responseJson.body.message)
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
    },
    openMessageModal(message: string){
      this.textMessageModal = message
      this.isOpenMessageModal = true
      setTimeout(()=>{
        this.closeMessageModal() 
      },1200)
    },
    closeMessageModal() {
      this.isOpenMessageModal = false
      this.textMessageModal = ''
    }
  },
})