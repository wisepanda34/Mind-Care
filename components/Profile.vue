<!-- components/Profile.vue -->
<script setup lang='ts'>
import { useAuthStore } from '@/stores/auth.store';
import type { IUser, IUpdateUser } from '@/types/auth.type'
import { useVuelidate } from '@vuelidate/core'
import { required, maxLength, minLength, sameAs, helpers } from '@vuelidate/validators'
import BirthdayPicker from './BirthdayPicker.vue';



const authStore = useAuthStore()
const state = reactive({
  name:'',
  phone:'',
  birthday: <Date | null>(null),
  oldPassword:'',
  newPassword:'',
  confirmPassword:'',
})

const phoneRegex = /^(\d{3}[\s-]?){2}\d{2}\s?\d{2}$/;
const rules = {
  name: { required, minLength: minLength(2), maxLength: maxLength(20)},
  phone: { required, phoneFormat: helpers.regex(phoneRegex)},
  oldPassword: { maxLength: maxLength(20) },
  newPassword: { minLength: minLength(3), maxLength: maxLength(16)},
  confirmPassword: { sameAs: sameAs(state.newPassword)},
};

const v$ = useVuelidate(rules, state);  

const handleUpdateBirthday = (date: Date | null) => {
  state.birthday = date;
};

const editAvatar = () => {
  console.log('editAvatar');
}
const submitCancel = () => {
  navigateTo('/')
}
const submitSave = () => {
  const newData: Partial<IUpdateUser> = {};
  let hasChanges = false;
  const { name, phone, birthday, oldPassword, newPassword, confirmPassword } = state;

  if (name !== authStore.user.name) {
    newData.name = name;
    hasChanges = true;
  }
  if (phone !== authStore.user.phone) {
    newData.phone = phone;
    hasChanges = true;
  }
  if (birthday !== authStore.user.birthday) {
    newData.birthday = birthday;
    hasChanges = true;
  }
  if (oldPassword || newPassword || confirmPassword) {
    if (!(oldPassword && newPassword && confirmPassword)) {
      console.log('Fill in all three password fields.');
      return; 
    }
    if (newPassword !== confirmPassword) {
      console.log('New password and confirm password do not match.');
      return;
    }
    newData.oldPassword = oldPassword;
    newData.newPassword = newPassword;
    hasChanges = true;
  }
  if (hasChanges) {
    console.log('New data to save:', newData);
  } else {
    console.log('No changes to save.');
  }
};

onMounted(()=>{
  state.name = authStore.user.name
  state.phone = authStore.user.phone
  state.birthday = authStore.user.birthday
})

</script>
 
<template>
  <div section="profile">
    <UILogo/>
    <h1 class="text-center text--fz30 text--fw700 text--grey-5">Edit profile</h1>
    <div class="profile__avatar" @click="editAvatar">
      <NuxtImg  src="images/empty-avatar.jpg" alt="avatar"/>
    </div>

    <!-- <p class="">Edit avatar</p> -->
    <div class="profile__email">{{ authStore.user.email }}</div>

    <form class="profile__inputs">
      <UIInput
      v-model="state.name"
      id="userName"
      type="text"
      label="Username"
    />
    <!-- <p v-if="v$.userName.minLength.$invalid" class="field-error text--red">Email is required</p>
    <p v-if="v$.userName.maxLength.$invalid" class="field-error text--red">Invalid email format</p> -->

    <UIInput
      v-model="state.phone"
      id="phone"
      type="text"
      label="Phone"
    />
    <!-- <p v-if="v$.phone.phoneRegex.$invalid" class="field-error text--red">Invalid email format</p> -->

    <BirthdayPicker 
      class="profile__birthday"
      :date="state.birthday"
      label="Birthday"
      @update:selectedDate="handleUpdateBirthday" 
    />

    <p>Change password</p>
    <div class="profile__line"></div>
    <UIInput
      v-model="state.oldPassword"
      id="oldPassword"
      type="password"
      label="Old password"
    />
    <UIInput
      v-model="state.newPassword"
      id="newPassword"
      type="password"
      label="New password"
    />
    <!-- <p v-if="v$.newPassword.required.$invalid" class="field-error text--red">Password is required</p>
    <p v-if="v$.newPassword.minLength.$invalid" class="field-error text--red">Minimum 3 symbols</p>
    <p v-if="v$.newPassword.maxLength.$invalid" class="field-error text--red">Maximum 20 symbols</p> -->

    <UIInput
      v-model="state.confirmPassword"
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
  &__email{
    font-size: 24px;
    padding-left: 50px;
    margin-top: 20px;
  }

  &__inputs{
    max-width: 600px;
    padding:20px 50px;
  }
  &__birthday{
    margin: 12px 0 40px;
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