// middleware/onlyDoctor.ts
import { useAuthStore } from "~/stores/auth.store";

export default defineNuxtRouteMiddleware((to,from)=> {
  console.log('onlyDoctor');
  
  const app = useNuxtApp()
  const authStore = useAuthStore(app.$pinia)

  if(authStore.user.role !== 'doctor'){
    return abortNavigation()
  }
  
})