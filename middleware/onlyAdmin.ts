// middleware/onlyAdmin.ts
import { useAuthStore } from "~/stores/auth.store";

export default defineNuxtRouteMiddleware((to,from)=> {
  
  const app = useNuxtApp()
  const authStore = useAuthStore(app.$pinia)

  if(authStore.user.role !== 'admin'){
    return navigateTo('/')
  }
})