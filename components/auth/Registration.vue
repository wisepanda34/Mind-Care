<!-- components/auth/Registration.vue -->
<script setup lang='ts'>
import { useAuthStore } from '@/stores/auth.store';
import type {INewUser, RoleT} from '@/types/auth.type'
import { useVuelidate } from '@vuelidate/core'
import { required, email as emailValidator, maxLength, minLength, sameAs, helpers } from '@vuelidate/validators'
import BirthdayPicker from '../BirthdayPicker.vue';
import { ROLE, phoneRegex } from '~/constants';

const authStore = useAuthStore()
const message = ref<string | null>(null);
const selectedRole = ref<RoleT>(ROLE.CLIENT)
const state = reactive({
  name:'',
  email:'',
  phone:'',
  birthday: <Date | null>(null),
  password:'',
  confirmPassword:'',
})

const rules = {
  name: { required, minLength: minLength(2), maxLength: maxLength(20)},
  email: { required, email: emailValidator },
  password: { required, minLength: minLength(3), maxLength: maxLength(20)},
  confirmPassword: { sameAs:sameAs(computed(() => state.password))},
  phone: { required, phoneFormat: helpers.regex(phoneRegex)},
  birthday: {required}
};
const v$ = useVuelidate(rules, state, { $autoDirty: true });

const handleUpdateBirthday = (date: Date | null) => {
  state.birthday = date;
};
const handleUpdateRole = (role: RoleT) => {
  selectedRole.value = role;
}

const submitRegistration = async() => {
  v$.value.$touch()
  if (v$.value.$invalid){
    message.value = 'Please fill in all fields'
    return
  }
  const newUser: INewUser = {
    name: state.name,
    email: state.email,
    role: selectedRole.value,
    phone: state.phone,
    birthday: state.birthday,
    password: state.password,
  }
  message.value = await authStore.fetchRegistration(newUser)
}

const cancelRegistration = () => {
  authStore.cancelRegistration()
}

const isNameTouched = ref(false);
const isEmailTouched = ref(false);
const isPhoneTouched = ref(false);
const isBirthTouched = ref(false);
const isPassTouched = ref(false);
const isConfirmTouched = ref(false);
const focusName = () => isNameTouched.value = false
const blurName = () => isNameTouched.value = true
const focusEmail = () => isEmailTouched.value = false
const blurEmail = () => isEmailTouched.value = true
const focusPhone = () => isPhoneTouched.value = false
const blurPhone = () => isPhoneTouched.value = true
const focusBirth = () => isBirthTouched.value = false
const blurBirth = () => isBirthTouched.value = true
const focusPass = () => isPassTouched.value = false
const blurPass = () => isPassTouched.value = true
const focusConfirm = () => isConfirmTouched.value = false
const blurConfirm = () => isConfirmTouched.value = true

defineExpose({ submitRegistration })
</script>
 
<template>
  <div>
    <div class="modal__header">
            <h3 class="text--fz24 text--fw700">Registration</h3>
            <UIRole v-model="selectedRole" @update:selectedRole="handleUpdateRole"/>
            <div class="modal__close" @click="authStore.toggleAuthModal">X</div>
    </div>
    <div class="modal__body">
      <form class="modal__form">
        <UIInput
          v-model="state.name"
          id="name"
          type="text"
          label="Name"
          @focus="focusName" 
          @blur="blurName"
        />
        <div class="modal__warning">
          <p v-if="isNameTouched && v$.name.required.$invalid && v$.name.$dirty">Name is required</p>
          <p v-if="isNameTouched && v$.name.minLength.$invalid">Min 2 symbols</p>
          <p v-if="isNameTouched && v$.name.maxLength.$invalid">Max 20 symbols</p>
        </div>
        
        <UIInput
          v-model="state.email"
          id="email"
          type="text"
          label="Email"
          @focus="focusEmail" 
          @blur="blurEmail"
        />
        <div class="modal__warning">
          <p v-if="isEmailTouched && v$.email.required.$invalid && v$.email.$dirty">Email is required</p>
          <p v-if="isEmailTouched && v$.email.email.$invalid">Invalid email format</p>
        </div>
        <UIInput
          v-model="state.phone"
          id="phone"
          type="text"
          label="Phone"
          @focus="focusPhone" 
          @blur="blurPhone"
        />
        <div class="modal__warning">
          <p v-if="isPhoneTouched && v$.phone.required.$invalid && v$.phone.$dirty">Email is required</p>
          <p v-if="isPhoneTouched && v$.phone.phoneFormat.$invalid">Invalid email format</p>
        </div>
        
        <BirthdayPicker 
          class="modal__birthday"
          label="Birthday"
          :date="state.birthday"
          @update:selectedDate="handleUpdateBirthday" 
          @focus="focusBirth" 
          @blur="blurBirth"
        />
        <div class="modal__warning">
          <p v-if="isBirthTouched && v$.birthday.required.$invalid && v$.birthday.$dirty">Birthday is required</p>
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
          <p v-if="isPassTouched && v$.password.minLength.$invalid">Minimum 3 symbols</p>
          <p v-if="isPassTouched && v$.password.maxLength.$invalid">Minimum 20 symbols</p>
        </div>

        <UIInput
          v-model="state.confirmPassword"
          id="confirmPassword"
          type="password"
          label="Confirm password"
          @focus="focusConfirm" 
          @blur="blurConfirm"
        />
        <div class="modal__warning">
          <p v-if="isConfirmTouched && v$.confirmPassword.sameAs.$invalid">not match password</p>
        </div>
      </form>
      <div v-if="message" class="modal__message">{{ message }}</div>
    </div>

    <div class="modal__footer">
      <div class="modal__footer-up">
        <UIButton text="Cancel" @click="cancelRegistration"/>
        <UIButton class="btn-ok" text="OK" @click="submitRegistration"/>
      </div>
    </div>
  </div>
</template>
 
<style scoped lang='scss'>
 
</style>