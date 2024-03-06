<!-- components/auth/Registration.vue -->
<script setup lang='ts'>
import { useAuthStore } from '@/stores/auth.store';
import { ENTER } from '~/constants';

const authStore = useAuthStore()
const emailRef = ref('')
const passwordRef = ref('')
const confirmPasswordRef = ref('')

const submitRegistration = () => {
  console.log('submitRegistration');
}
const cancelRegistration = () => {
  authStore.toggleAuthModal()
  authStore.processAuth = ENTER.LOGIN
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
        <UIInput
          v-model="confirmPasswordRef"
          id="confirmPassword"
          type="text"
          label="Confirm password"
        />
        <p class="field-error text--red"></p>
      </form>
    </div>

    <div class="login__footer">
      <div class="login__footer-up">
        <UIButton text="Cancel" @click="cancelRegistration"/>
        <UIButton class="btn-ok" text="OK" @click="submitRegistration"/>
      </div>
    </div>
  </div>
</template>
 
<style scoped lang='scss'>
 
</style>