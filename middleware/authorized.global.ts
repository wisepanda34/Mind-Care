// middleware/authorized.ts
import { useAuthStore } from "~/stores/auth.store";

const publicUrls = ['/', '/specialists', '/reviews']

export default defineNuxtRouteMiddleware(async(to, from)=> {
  const app = useNuxtApp()
  const authStore = useAuthStore(app.$pinia)
  console.log('global middleware');

  if (!authStore.isAuthed && !publicUrls.includes(to.path)) {
    return navigateTo('/');
  }
  return;
});

