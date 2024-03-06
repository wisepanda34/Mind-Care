<!-- components/auth/Login.vue -->
<script setup lang='ts'>
import { useAuthStore } from '@/stores/auth.store';


const authStore = useAuthStore()
const emailRef = ref('')
const passwordRef = ref('')

const submitLogin = () => {
      // Логика залогинивания
      console.log('submitLogin');
}
const startRegistration = () => {
  console.log('startRegistration');
  authStore.startRegistration()
}
const restorePassword = () => {
  console.log('restorePassword');
}
</script>
 
<template>
  <div>
    <div class="login__header">
            <h3 class="text--fz24 text--fw700">Enter</h3>
            <div class="login__close" @click="authStore.toggleAuthModal">X</div>
    </div>
    <div class="login__body">
      <form class="login__form">
        <UIInput
          v-model="emailRef"
          id="email"
          type="text"
          label="Email"
        />
        <p class="field-error text--red"></p>
        <UIInput
          v-model="passwordRef"
          id="password"
          type="text"
          label="Password"
        />
        <p class="field-error text--red"></p>
      </form>
      
    </div>
    <div class="login__footer">
      <div class="login__footer-up">
        <div class="text--blue-600 curspoint" @click="restorePassword">Forgot password?</div>
        <UIButton class="btn-ok" text="OK" @click="submitLogin"/>
      </div>
      
      <div>
        <span class="text--green text--fz20 curspoint" @click="startRegistration">Registration</span>
      </div>
    </div>
  </div>
</template>
 
<style scoped lang='scss'>

</style>