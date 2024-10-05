<!-- components/auth/Login.vue -->
<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core';
import { required, email as emailValidator, minLength } from '@vuelidate/validators';
import type {ILogin, RoleT} from '@/types/auth.type'

import { useAuthStore } from '@/stores/auth.store';
import { ROLE } from '~/constants';

const authStore = useAuthStore();
const selectedRole = ref<RoleT>(ROLE.CLIENT)
const message = ref<string | null>(null);
const state = reactive({
  email:'demo@mail.com',
  password:'demo'
})

const rules = {
  email: { required, email: emailValidator },
  password: { required },
};

const v$ = useVuelidate(rules, state, { $autoDirty: true, $lazy: true });

const submitLogin = async () => {
  v$.value.$touch()
  if (v$.value.$invalid){
    message.value = 'Please input email and password'
    return
  }
  const data: ILogin = {
    email: state.email,
    password: state.password,
    role: selectedRole.value
  }
    message.value = await authStore.fetchLogin(data);
};

const startRegistration = () => {
  authStore.startRegistration();
};

const restorePassword = () => {
  console.log('restorePassword');
};

const handleUpdateRole = (role: RoleT) => {
  selectedRole.value = role;
}

const isEmailTouched = ref(false);
const isPassTouched = ref(false);
const focusEmail = () => {isEmailTouched.value = false, message.value = null} 
const blurEmail = () => isEmailTouched.value = true
const focusPass = () => {isPassTouched.value = false, message.value = null}
const blurPass = () => isPassTouched.value = true

defineExpose({ submitLogin })
</script>

<template>
  <div v-if="authStore.isOpenAuthModal">
    <div class="modal__header">
      <h3 class="text--fz24 text--fw700">Enter</h3>
      <UIRole v-model="selectedRole" @update:selectedRole="handleUpdateRole"/>
      <div class="modal__close" @click="authStore.toggleAuthModal">
        <svg width="24" height="24" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M4.11 2.697L2.698 4.11 6.586 8l-3.89 3.89 1.415 1.413L8 9.414l3.89 3.89 1.413-1.415L9.414 8l3.89-3.89-1.415-1.413L8 6.586l-3.89-3.89z" fill="#4b4b4c"></path>
        </svg>
      </div>
    </div>
    <div class="modal__body">
      <form class="modal__form" @submit.prevent="submitLogin">
        <UIInput
          v-model="state.email"
          id="email"
          type="text"
          label="Email"
          @focus="focusEmail" 
          @blur="blurEmail"
        />
        <div class="modal__warning">
          <p v-show="isEmailTouched && v$.email.required.$invalid && v$.email.$dirty">Email is required</p> 
          <p v-show="isEmailTouched && v$.email.email.$invalid && v$.email.$dirty">Invalid email format</p>
        </div>
      
        <UIInput
          v-model="state.password"
          id="password"
          type="password"
          label="Password"
          @focus="focusPass" 
          @blur="blurPass"
        />
        <div class="modal__warning">
          <p v-if="isPassTouched && v$.password.required.$invalid && v$.password.$dirty">Password is required</p>
        </div>
      </form>
      <div v-if="message" class="modal__message">{{ message }}</div>
    </div>
    <div class="modal__footer">
      <div class="modal__footer-up">
        <div class="text--blue-600 curspoint user-none" @click="restorePassword">Forgot password?</div>
        <UIButton class="btn-ok" text="OK" @click.prevent="submitLogin"/>
      </div>
      
      <div>
        <span class="text--green text--fz20 curspoint user-none" @click="startRegistration">Registration</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
