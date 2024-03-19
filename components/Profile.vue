<!-- components/Profile.vue -->
<script setup lang='ts'>
import { useAuthStore } from '@/stores/auth.store';
import type {INewUser} from '@/types/auth.type'
import { useVuelidate } from '@vuelidate/core'
import { required, maxLength, minLength, sameAs } from '@vuelidate/validators'



const authStore = useAuthStore()
const password = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const userName = ref('')
const phone = ref('')
const birthday = ref('')

const phoneRegex = /^(\d{3}[\s-]?){2}\d{2}\s?\d{2}$/;
const rules = {
  password: { required },
  newPassword: { required, minLength: minLength(3), maxLength: maxLength(20) },
  confirmPassword: {sameAs: sameAs(password)},
  userName: { required, minLength: minLength(3), maxLength: maxLength(20) },
  phone: { pattern: phoneRegex },
};

const v$ = useVuelidate(rules, { password, newPassword, confirmPassword, userName, phone });  

const editAvatar = () => {

}
const submitCancel = () => {

}
const submitSave = () => {
  
}

</script>
 
<template>
  <div section="profile">
    <UILogo/>
    <h1 class="text-center text--fz30 text--fw700 text--grey-5">Edit profile</h1>
    <div class="profile__avatar" @click="editAvatar">
      <NuxtImg  src="images/empty-avatar.jpg" alt="avatar"/>
    </div>
    <!-- <p class="">Edit avatar</p> -->

    <form class="profile__inputs">
      <UIInput
      v-model="userName"
      id="userName"
      type="text"
      label="Username"
    />
    <!-- <p v-if="v$.userName.minLength.$invalid" class="field-error text--red">Email is required</p>
    <p v-if="v$.userName.maxLength.$invalid" class="field-error text--red">Invalid email format</p> -->

    <UIInput
      v-model="phone"
      id="phone"
      type="text"
      label="Phone"
    />
    <!-- <p v-if="v$.phone.phoneRegex.$invalid" class="field-error text--red">Invalid email format</p> -->

    <div class="text--fz18 mt--30 mb--30">Birthday</div>

    <p>Change password</p>
    <div class="profile__line"></div>
    <UIInput
      v-model="password"
      id="oldPassword"
      type="password"
      label="Old password"
    />
    <UIInput
      v-model="newPassword"
      id="newPassword"
      type="password"
      label="New password"
    />
    <!-- <p v-if="v$.newPassword.required.$invalid" class="field-error text--red">Password is required</p>
    <p v-if="v$.newPassword.minLength.$invalid" class="field-error text--red">Minimum 3 symbols</p>
    <p v-if="v$.newPassword.maxLength.$invalid" class="field-error text--red">Maximum 20 symbols</p> -->

    <UIInput
      v-model="confirmPassword"
      id="confirmPassword"
      type="password"
      label="Confirm password"
    />
    <!-- <p v-if="v$.confirmPassword.sameAs.$invalid" class="field-error text--red">not match password</p> -->
      <div class="profile__buttons">
        <UIButton  text="Cancel" @click="submitCancel"/>
        <UIButton class="btn-ok" text="Save" @click="submitSave"/>
      </div>
    </form>
    
  </div>
</template>
 
<style scoped lang='scss'>
.profile{

  &__avatar{
    width: 200px;
    height: 200px;
    border-radius: 50%;
    overflow: hidden;

    margin: 20px auto 10px 50px;

    img{
      width: 100%;
    }
  }

  &__inputs{
    max-width: 600px;
    padding:20px 50px;
  }
  &__line{
    width: 100%;
    height: 1px;
    background: $grey-5;
    margin-top: 7px;
    margin-bottom: 10px;
  }
  &__buttons{
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
  }
} 
</style>