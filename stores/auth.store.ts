// stores/auth.store.ts
import { defineStore } from "pinia";
import type { IStateAuth, IUser } from "~/types/auth.type";


export const useAuthStore = defineStore('auth', {
  state: (): IStateAuth => ({
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

})