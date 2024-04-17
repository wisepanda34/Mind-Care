// middleware/consultation.ts
import { useAuthStore } from "~/stores/auth.store";

const isPrivateRoutes = [
  '/profile',
  /^\/specialists\/.*/,
]

export default defineNuxtRouteMiddleware((to,from)=> {
  const app = useNuxtApp()
  const authStore = useAuthStore(app.$pinia)



  
})