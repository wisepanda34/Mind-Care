<!-- components/auth/Registration.vue -->
<script setup lang='ts'>
import { useAuthStore } from '@/stores/auth.store';
import type {INewUser, MindRequestOptions} from '@/types/auth.type'
import { useVuelidate } from '@vuelidate/core'
import { required, email as emailValidator, maxLength, minLength, sameAs } from '@vuelidate/validators'

const authStore = useAuthStore()
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const rules = {
  email: { required, email: emailValidator },
  password: { required, minLength: minLength(3) },
  confirmPassword: {sameAs: sameAs(password)}
};

const v$ = useVuelidate(rules, {email, password, confirmPassword});

const submitRegistration = async() => {
  console.log('submitRegistration');
  // const newUser: INewUser = {
  //   email: email.value,
  //   password: password.value,
  // }
  // const requestOptions: MindRequestOptions = {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(newUser)
  // };
  // try {
  //   const response = await fetch('/api/registration', requestOptions);
  //   if(!response.ok){
  //     throw new Error('error')
  //   }
  //   console.log('response: ', response);
  //   console.log('request is sent to server');
    
    
    
  // } catch (error) {
  //   console.error('Error submitting registration:', error);
  // }
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
          type="text"
          label="Password"
        />
        <p v-if="v$.password.required.$invalid" class="field-error text--red">Password is required</p>
        <p v-if="v$.password.minLength.$invalid" class="field-error text--red">Minimum 3 symbols</p>

        <UIInput
          v-model="confirmPassword"
          id="confirmPassword"
          type="text"
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