// stores/auth.store.ts
import axios from "axios";
import { defineStore } from "pinia";
import { ENTER, ROLE } from "~/constants";
import type { IStateAuth, IUser, INewUser, IUpdateUser, EnterT, RoleT, MindRequestOptions, ILogin } from "~/types/auth.type";

export const useAuthStore = defineStore('auth', {
  state: (): IStateAuth => ({
    isOpenAuthModal: false,
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
      birthday: '',
      registeredAt: '',
      avatar: '',
      info: null
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
      console.log('newData: ', newData);
      const data = {
        ...newData,
        id: this.user.id,
        role: this.user.role
      }
      // const formData = new FormData();
      // Object.entries(newData).forEach(([key, value]) => {
      //   if (key === 'photoFile' && value instanceof File) {
      //     formData.append(key, value);
      //   } else {
      //     formData.append(key, JSON.stringify(value));
      //   }
      // });
      // formData.append('id', this.user.id);
      // formData.append('role', this.user.role ?? '');
      // console.log('FormData size:', formData.values);
      

      const requestOptions: MindRequestOptions = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };
      try {
        const response = await fetch('/api/update-user', requestOptions);
        const responseJson = await response.json();
        this.openMessageModal(responseJson.body.message)

        if(!response.ok){
          this.openMessageModal('fetchUpdateUser !response.ok')
        }
        const resUser = responseJson.user
        console.log('resUser', resUser);
        
        if (resUser) {
          this.$patch({
            user: {
              id: resUser.id,
              email: resUser.email,
              name: resUser.name,
              surname: resUser.surname,
              role: resUser.role as RoleT,
              phone: resUser.phone,
              birthday: resUser.birthday,
              registeredAt: resUser.registeredAt,
              avatar: resUser.avatar,
              info: resUser.info
            }
          });
        } else {
          console.error("User data not found in server response.");
        }
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
        
        this.openMessageModal(responseJson.body.message)

        if(!response.ok){
          return responseJson.body.message
        }
        const data = responseJson.user

        this.$patch({
          user: {
            id: data.id,
            name: data.name,
            surname: data.surname,
            email: data.email,
            role: data.role as RoleT,
            phone: data.phone,
            birthday: data.birthday,
            registeredAt: data.registeredAt,
            avatar: data.avatar,
            info: data.info
          }
        });
        
        this.isAuthed = true
        this.toggleAuthModal()
        return responseJson.body.message

      } catch (error) {
        console.error("Error fetching modal data:", error);
      } finally {
        if(this.user.role === 'admin') {
          navigateTo('/admin')
        }
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
          birthday: '',
          registeredAt: '',
          avatar: '',
          info: null
        } as IUser; 
        navigateTo('/');
      }
    },
    toggleAuthModal(){
      this.isOpenAuthModal = !this.isOpenAuthModal
      if(this.isOpenAuthModal) this.processAuth = ENTER.LOGIN
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