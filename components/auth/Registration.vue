<!-- components/auth/Registration.vue -->
<script setup lang='ts'>
import { useAuthStore } from '@/stores/auth.store';
import type {IUser} from '@/types/auth.type'
import { useVuelidate } from '@vuelidate/core'
import { required, email as emailValidator, maxLength, minLength, sameAs, helpers } from '@vuelidate/validators'
import BirthdayPicker from '../BirthdayPicker.vue';
import { ROLE } from '~/constants';


const authStore = useAuthStore()
const state = reactive({
  name:'Fox',
  email:'fox@mail.qwqw',
  phone:'0991234567',
  birthday: <Date | null>(null),
  password:'qwqw',
  confirmPassword:'qwqw',
})

const phoneRegex = /^(\d{3}[\s-]?){2}\d{2}\s?\d{2}$/;
const rules = {
  name: { required, minLength: minLength(2), maxLength: maxLength(20)},
  email: { required, email: emailValidator },
  password: { required, minLength: minLength(3), maxLength: maxLength(16)},
  confirmPassword: {sameAs: sameAs(state.password)},
  phone: { required, phoneFormat: helpers.regex(phoneRegex)},
  birthday: {required}
};

const v$ = useVuelidate(rules, state);

const handleUpdateBirthday = (date: Date | null) => {
  state.birthday = date;
};

const submitRegistration = () => {
  if (v$.value.$invalid){
    return
  }
  const newUser: IUser = {
    id: new Date().getTime().toString(),
    name: state.name,
    email: state.email,
    role: ROLE.USER,
    phone: state.phone,
    birthday: state.birthday as Date,
    password: state.password,
    registeredAt: new Date()
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
    <pre>{{ v$.$invalid }}</pre>
    <div class="login__body">
      <form class="login__form">
        <UIInput
          v-model="state.name"
          id="name"
          type="text"
          label="Name"
        />
         <p v-if="v$.name.minLength.$invalid" class="field-error text--red">Email is required</p>
        <p v-if="v$.name.maxLength.$invalid" class="field-error text--red">Invalid email format</p>
        <UIInput
          v-model="state.email"
          id="email"
          type="text"
          label="Email"
        />
        <p v-if="v$.email.required.$invalid" class="field-error text--red">Email is required</p>
        <p v-if="v$.email.email.$invalid" class="field-error text--red">Invalid email format</p>
        <UIInput
          v-model="state.phone"
          id="phone"
          type="text"
          label="Phone"
        />
        <p v-if="v$.phone.required.$invalid" class="field-error text--red">Email is required</p>
        <p v-if="v$.phone.phoneFormat.$invalid" class="field-error text--red">Invalid email format</p>
        
        <BirthdayPicker 
          class="login__birthday"
          :date="state.birthday"
          @update:selectedDate="handleUpdateBirthday" 
        />
        <p v-if="v$.birthday.required.$invalid" class="field-error text--red">Birthday is required</p>

        <UIInput
          v-model="state.password"
          id="password"
          type="password"
          label="Password"
        />
        <p v-if="v$.password.required.$invalid" class="field-error text--red">Password is required</p>
        <p v-if="v$.password.minLength.$invalid" class="field-error text--red">Minimum 3 symbols</p>
        <p v-if="v$.password.maxLength.$invalid" class="field-error text--red">Minimum 20 symbols</p>

        <UIInput
          v-model="state.confirmPassword"
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