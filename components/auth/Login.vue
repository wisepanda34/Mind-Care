<!-- components/auth/Login.vue -->
<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core';
import { required, email as emailValidator, minLength } from '@vuelidate/validators';
import { useAuthStore } from '@/stores/auth.store';

const authStore = useAuthStore();
const email = ref('');
const password = ref('');

const rules = {
  email: { required, email: emailValidator },
  password: { required, minLength: minLength(3) },
};

const v$ = useVuelidate(rules, { email, password });

const submitLogin = () => {
  if (v$.value.$invalid) {
    // Form is invalid, do not submit
    return;
  }
  // Логика залогинивания
  console.log('submitLogin');
};

const startRegistration = () => {
  console.log('startRegistration');
  authStore.startRegistration();
};

const restorePassword = () => {
  console.log('restorePassword');
};

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
          v-model="email"
          id="email"
          type="text"
          label="Email"
        />
        <p v-if="v$.email.required.$invalid" class="field-error text--red">Email is required</p>
        <p v-if="v$.email.email.$invalid" class="field-error text--red">Invalid email format</p>

        <UIInput
          v-model="password"
          id="password"
          type="password"
          label="Password"
        />
        <p v-if="v$.password.required.$invalid" class="field-error text--red">Password is required</p>
        <p v-if="v$.password.minLength.$invalid" class="field-error text--red">Minimum 3 symbols</p>
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

<style scoped lang="scss">
.field-error {
  height: 16px;
}
</style>
