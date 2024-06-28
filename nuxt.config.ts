// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr : true , 
  typescript: {
    typeCheck: true,
    strict: true
  },
  app: {
    pageTransition: { name: 'page-fade', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "Mind Care",
      link: [{ rel: "icon", type: "image/svg+xml", href: "/favicon.ico" }]
    },
    
  },
  devtools: { enabled: true },
  runtimeConfig: {
    dbUrl: process.env.DATABASE_URL,
  },
  modules: ['@pinia/nuxt', "@nuxt/image", '@morev/vue-transitions/nuxt'],
  build: {
    transpile: ['@vuepic/vue-datepicker']
  },
  css: [
    '~/assets/scss/main.scss',
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "@/assets/scss/variables.scss";
            @import "@/assets/mixins/animations.scss";
            @import "@/assets/scss/transition.scss";
          `
        }
      }
    }
  }
})