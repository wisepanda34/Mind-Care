<!-- components/auth/Registration.vue -->
<script setup lang='ts'>
import { useAuthStore } from '@/stores/auth.store';
import type {INewUser} from '@/types/auth.type'
import { useVuelidate } from '@vuelidate/core'
import { required, email as emailValidator, maxLength, minLength, sameAs } from '@vuelidate/validators'

const authStore = useAuthStore()
const email = ref('fox@mail.com')
const password = ref('qwqw')
const confirmPassword = ref('qwqw')

const rules = {
  email: { required, email: emailValidator },
  password: { required, minLength: minLength(3) },
  confirmPassword: {sameAs: sameAs(password)}
};

const v$ = useVuelidate(rules, {email, password, confirmPassword});

const submitRegistration = () => {
  console.log('submitRegistration');
  const newUser: INewUser = {
    email: email.value,
    password: password.value,
  }
  authStore.fetchRegistration(newUser)
}

const cancelRegistration = () => {
  authStore.cancelRegistration()
}

</script>
 
<template>
  <div>
    <div class="login__header">
            <h3 class="text--fz24 text--fw700">Registration</h3>
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

        <UIInput
          v-model="confirmPassword"
          id="confirmPassword"
          type="password"
          label="Confirm password"
        />
        <p v-if="v$.confirmPassword.sameAs.$invalid" class="field-error text--red">not match password</p>
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