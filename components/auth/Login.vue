<!-- components/auth/Login.vue -->
<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core';
import { required, email as emailValidator, minLength } from '@vuelidate/validators';
import type {INewUser, ILogin} from '@/types/auth.type'

import { useAuthStore } from '@/stores/auth.store';

const authStore = useAuthStore();
const message = ref<string | null>(null);
const state = reactive({
  email:'fox@mail.qwqw',
  password:'qwqw'
})

const rules = {
  email: { required, email: emailValidator },
  password: { required },
};

const v$ = useVuelidate(rules, state);

const submitLogin = async () => {
  if (v$.value.$invalid){
    message.value = 'Please input email and password'
    return
  }
  const data: ILogin = {
    email: state.email,
    password: state.password
  }
    message.value = await authStore.fetchLogin(data);
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
    <div class="modal__header">
      <h3 class="text--fz24 text--fw700">Enter</h3>
      <div class="modal__close" @click="authStore.toggleAuthModal">X</div>
    </div>
    <div class="modal__body">
      <form class="modal__form">
        <UIInput
          v-model="state.email"
          id="email"
          type="text"
          label="Email"
        />
        <p v-if="v$.email.required.$invalid" class="field-error text--red">Email is required</p>
        <p v-if="v$.email.email.$invalid" class="field-error text--red">Invalid email format</p>

        <UIInput
          v-model="state.password"
          id="password"
          type="password"
          label="Password"
        />
        <p v-if="v$.password.required.$invalid" class="field-error text--red">Password is required</p>
      </form>
      <div v-if="message" class="modal__message">{{ message }}</div>
    </div>
    <div class="modal__footer">
      <div class="modal__footer-up">
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
