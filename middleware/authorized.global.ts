// middleware/authorized.ts
import { useAuthStore } from "~/stores/auth.store";

const isPrivateRoutes = [
  '/profile',
  /^\/specialists\/.*/,
]

export default defineNuxtRouteMiddleware((to)=> {
  const app = useNuxtApp()
  const authStore = useAuthStore(app.$pinia)

  const isPrivateRoute = isPrivateRoutes.some((privetRoute) => {
    if (typeof privetRoute === 'string') {
      // Если это строка, сравниваем пути напрямую
      return to.path === privetRoute;
    } else {
      // Если это регулярное выражение, проверяем соответствие пути
      return privetRoute.test(to.path);
    }
  });

  const isUserAuthed = authStore.isAuthed
  if (isPrivateRoute && !isUserAuthed) {
    return abortNavigation()
  }
})