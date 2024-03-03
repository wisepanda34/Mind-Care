// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr : false , 
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "Congratulate",
      link: [{ rel: "icon", type: "image/svg+xml", href: "/logoMindCare.ico" }]
    }
  },
  devtools: { enabled: true },
  runtimeConfig: {
    dbUrl: process.env.DATABASE_URL,
  },
  modules: [],
  
  css: [
    '~/assets/scss/main.scss',
  ],
})
