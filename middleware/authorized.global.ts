// middleware/authorized.ts
import { useAuthStore } from "~/stores/auth.store";

const publicUrls = ['/', '/specialists', '/reviews', '/contacts']

export default defineNuxtRouteMiddleware(async(to, from)=> {
  const app = useNuxtApp()
  const authStore = useAuthStore(app.$pinia)

  if (!authStore.isAuthed && !publicUrls.includes(to.path)) {
    return navigateTo('/');
  }
  return;
});

