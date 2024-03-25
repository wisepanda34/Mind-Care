<!-- components/auth/Registration.vue -->
<script setup lang='ts'>
import { useAuthStore } from '@/stores/auth.store';
import type {IUser} from '@/types/auth.type'
import { useVuelidate } from '@vuelidate/core'
import { required, email as emailValidator, maxLength, minLength, sameAs, helpers } from '@vuelidate/validators'
import BirthdayPicker from '../BirthdayPicker.vue';
import { ROLE } from '~/constants';


const authStore = useAuthStore()
const name = ref('Fox')
const email = ref('fox@mail.qwqw')
const phone = ref('0991234567')
const birthday = ref<Date | null>(null)
const password = ref('qwqw')
const confirmPassword = ref('qwqw')

const phoneRegex = /^(\d{3}[\s-]?){2}\d{2}\s?\d{2}$/;
const rules = {
  name: { required, minLength: minLength(2), maxLength: maxLength(20)},
  email: { required, email: emailValidator },
  password: { required, minLength: minLength(3), maxLength: maxLength(16)},
  confirmPassword: {sameAs: sameAs(password)},
  phone: { required, phoneFormat: helpers.regex(phoneRegex)},
};

const v$ = useVuelidate(rules, {name, email, phone , password, confirmPassword});
console.log('v$', v$);


const handleUpdateBirthday = (date: Date | null) => {
  birthday.value = date;
  console.log('birthday: ', birthday.value);
  
};

const submitRegistration = () => {
  console.log('submitRegistration');
  const newUser: IUser = {
    id: new Date().getTime().toString(),
    name: name.value,
    email: email.value,
    role: ROLE.USER,
    phone: phone.value,
    birthday: birthday.value as Date,
    password: password.value,
    registeredAt: new Date()
  }
  console.log('newUser: ', newUser);
  
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
          v-model="name"
          id="name"
          type="text"
          label="Name"
        />
         <p v-if="v$.name.minLength.$invalid" class="field-error text--red">Email is required</p>
        <p v-if="v$.name.maxLength.$invalid" class="field-error text--red">Invalid email format</p>
        <UIInput
          v-model="email"
          id="email"
          type="text"
          label="Email"
        />
        <p v-if="v$.email.required.$invalid" class="field-error text--red">Email is required</p>
        <p v-if="v$.email.email.$invalid" class="field-error text--red">Invalid email format</p>
        <UIInput
          v-model="phone"
          id="phone"
          type="text"
          label="Phone"
        />
        <p v-if="v$.phone.required.$invalid" class="field-error text--red">Email is required</p>
        <p v-if="v$.phone.phoneFormat.$invalid" class="field-error text--red">Invalid email format</p>
        
        <BirthdayPicker 
          class="login__birthday"
          :date="birthday"
          @update:selectedDate="handleUpdateBirthday" 
        />
        <UIInput
          v-model="password"
          id="password"
          type="password"
          label="Password"
        />
        <p v-if="v$.password.required.$invalid" class="field-error text--red">Password is required</p>
        <p v-if="v$.password.minLength.$invalid" class="field-error text--red">Minimum 3 symbols</p>
        <p v-if="v$.password.maxLength.$invalid" class="field-error text--red">Minimum 20 symbols</p>

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