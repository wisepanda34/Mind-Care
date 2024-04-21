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
  email:'',
  password:''
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
</script>

<template>
  <div>
    <div class="modal__header">
      <h3 class="text--fz24 text--fw700">Enter</h3>
      <UIRole v-model="selectedRole" @update:selectedRole="handleUpdateRole"/>
      <div class="modal__close" @click="authStore.toggleAuthModal">X</div>
    </div>
    <div class="modal__body">
      <form class="modal__form">
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
