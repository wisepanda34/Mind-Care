// stores/auth.store.ts
import axios from "axios";
import { defineStore } from "pinia";
import { ENTER } from "~/constants";
import type { IStateAuth, IUser, EnterT } from "~/types/auth.type";


export const useAuthStore = defineStore('auth', {
  state: (): IStateAuth => ({
    isOpenAuthModal: false,
    processAuth: ENTER.LOGIN,
    isAuthed: false,
    user: {
      avatar: null,
      birthday: '',
      email: '',
      id: '',
      name: '',
      phone: '',
      role: null,
      registeredAt: ''
    } as IUser
  }),
  actions: {
    async fetchLogin() {
      try {
        const response = await axios.get("/api/login");
        const { title, text } = response.data;
        // this.modalState.props = { title, text };
      } catch (error) {
        console.error("Error fetching modal data:", error);
      }
    },
    toggleAuthModal(){
      this.isOpenAuthModal = !this.isOpenAuthModal
    },
    startRegistration(){
      this.processAuth = ENTER.REGISTRATON
    }
  },

})