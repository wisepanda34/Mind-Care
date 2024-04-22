<!-- components/Profile.vue -->
<script setup lang='ts'>
import { useAuthStore } from '@/stores/auth.store';
import type { IUser, IUpdateUser, IInfo } from '@/types/auth.type'
import { useVuelidate } from '@vuelidate/core'
import { helpers } from '@vuelidate/validators'
import BirthdayPicker from './BirthdayPicker.vue';
import { phoneRegex } from '~/constants';



const authStore = useAuthStore()
const  changePasswordText = ref('')
const reqAvailable = ref(true)
const info = ref<IInfo>()
const education = ref<string[]>()
const textEducation = ref('')
const openAddEducation = ref(false)

const toggleAddEducation = () => {
  openAddEducation.value = !openAddEducation.value
}
const state = reactive({
  name:'',
  phone:'',
  birthday: <Date | null>(null),
  oldPassword:'',
  newPassword:'',
  confirmPassword:'',
})

const rules = {
  name: { isValidName: (value: string) => !value.trim() || (value.trim().length >= 2 && value.trim().length <= 20), isNotEmpty: (value: string) => !!value.trim()},
  phone: { isValidPhone: (value: string) => !value || phoneRegex.test(value), isNotEmpty: (value: string) => !!value.trim() },
  birthday: { isValidBirthday: (value: Date | null) => value !== null  },
  oldPassword: { isValidOldPassword: (value: string) => !value || (value.length <= 20)},
  newPassword: { isValidNewPassword: (value: string) => !value || (value.length >= 3 && value.length <= 20)},
  confirmPassword: { isValidNewPassword: (value: string) => value === state.newPassword},
};
const v$ = useVuelidate(rules, state);  

const handleUpdateBirthday = (date: Date | null) => {
  state.birthday = date;
};

const editAvatar = () => {
  console.log('editAvatar');
}
const submitCancel = () => {
  state.oldPassword = ''
  state.newPassword = ''
  state.confirmPassword = ''
  navigateTo('/')
}
const submitSave = async() => {
  reqAvailable.value = false
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
  if (oldPassword && newPassword && confirmPassword) {
    if (newPassword === confirmPassword) {
      newData.oldPassword = oldPassword;
      newData.newPassword = newPassword;
      hasChanges = true;
    } else {
      changePasswordText.value = 'New password and confirm password must match';
      return;
  }
}
  if (hasChanges) {
    console.log('Profile newData: ', newData);
    await authStore.fetchUpdateUser(newData)
  } else {
    console.log('No changes to save.');
  }
  hasChanges = false
  fillFields()
  reqAvailable.value = true
};
watch(() => [state.oldPassword, state.newPassword, state.confirmPassword], () => {
  const { oldPassword, newPassword, confirmPassword } = state;
  const allEmpty = !oldPassword && !newPassword && !confirmPassword;
  const allFilled = oldPassword && newPassword && confirmPassword;
  if (allEmpty || allFilled) {
    changePasswordText.value = '';
  }
});

const fillFields = () => {
  state.name = authStore.user.name
  state.phone = authStore.user.phone
  state.birthday = authStore.user.birthday
  state.oldPassword = ''
  state.newPassword = ''
  state.confirmPassword = ''
  if(authStore.user.role === 'doctor' && authStore.user.info?.education){
    education.value = authStore.user.info.education
  }
}
onMounted(()=>{
  fillFields()
})

</script>
 
<template>
  <div section="profile">
    <UILogo/>
    <h1 class="text-center text--fz30 text--fw700 text--grey-5">Edit profile</h1>
    <div class="profile__avatar" @click="editAvatar">
      <NuxtImg  src="images/empty-avatar.jpg" alt="avatar"/>
    </div>

    <div class="profile__email">{{ authStore.user.email }}</div>

    <form class="profile__inputs">
      
      <UIInput
        v-model="state.name"
        id="userName"
        type="text"
        label="Username"
      />
      <div class="modal__warning">
        <p v-if="v$.name.$invalid">Name must to has from 2 to 20 characters.</p>
      </div>

      <UIInput
        v-model="state.phone"
        id="phone"
        type="text"
        label="Phone"
      />
      <div class="modal__warning">
        <p v-if="v$.phone.$invalid">Invalid email format</p>
      </div>

      <BirthdayPicker 
        class="profile__birthday"
        :date="state.birthday"
        label="Birthday"
        @update:selectedDate="handleUpdateBirthday" 
      />
      <div class="modal__warning">
        <p v-if="v$.birthday.$invalid">Change date of your birthday</p>
      </div>

      <p class="profile__change-password">Change password</p>
      <div class="profile__line"></div>
      <div class="modal__warning">
        <p>{{ changePasswordText }}</p>
      </div>
      <UIInput
        v-model="state.oldPassword"
        id="oldPassword"
        type="password"
        label="Old password"
      />
      <div class="modal__warning"></div>
      <UIInput
        v-model="state.newPassword"
        id="newPassword"
        type="password"
        label="New password"
      />
      <div class="modal__warning">
        <p v-if="v$.newPassword.$invalid">Minimum 3 symbols</p>
      </div>

      <UIInput
        v-model="state.confirmPassword"
        id="confirmPassword"
        type="password"
        label="Confirm password"
      />
      <div class="modal__warning">
        <p v-if="v$.confirmPassword.$invalid">not match password</p>
      </div>

      <div v-if="authStore.user.role === 'doctor'" class="profile__info">
        <p class="profile__change-password">Info</p>
        <div class="profile__line"></div>
        <div class="profile__education">
          <h3>EDUCATION</h3>

          <div
            class="profile__education-item text--fz20"
            :class="{isHidden : openAddEducation}"
            v-for="(item, i) in education" 
            :key="i"
          > 
            <p>{{ item }}</p>
            <div class="profile__education-Xmark">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. --><path fill="#808080" d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zm175 79c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>
            </div>
          </div>
            
            <div class="profile__education-add" @click="toggleAddEducation">
              <svg v-if="!openAddEducation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. --><path fill="#808080" d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"/></svg>
              <svg v-if="openAddEducation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. --><path fill="#808080" d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zm175 79c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>
              
            </div>
            <UIInput 
              class="profile__education-input"
              :class="{isOpen: openAddEducation }"
              v-model="textEducation"
              id="textEducation"
              type="text"
              label="Input your education"
            />
        </div>
        <div class="profile__line"></div>

      </div>
     
      <div class="profile__buttons">
        <UIButton  text="Cancel" @click="submitCancel"/>
        <UIButton class="btn-ok" text="Save" @click="submitSave" :disabled="!reqAvailable" />
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
    margin: 12px 0 0px;
  }
  &__change-password{
    margin-top: 40px;
  }
  &__line{
    width: 100%;
    height: 1px;
    background: $grey-5;
    margin-top: 7px;
    margin-bottom: 10px;
  }
  &__education{
    position: relative;
    min-height: 200px;
    padding: 10px 0;

    display: grid;
    grid-template-rows: 30px auto 30px;

    &-item{
      margin: 10px 0 10px;
      display: grid;
      grid-template-columns: auto 20px;

    }
    &-item.isHidden{
      opacity: 0;
    }
    &-Xmark{
      width: 20px;
      height: 20px;
      cursor: pointer;
    }
    &-add{
      width: 30px;
      height: 30px;
      margin: 0 auto;
      cursor: pointer;
      svg{
        width: 100%;
      }
    }
    &-input{
      display: none;
      position: absolute;
      top: 50px;
      left: 0;
      width: 100%;
    }
    &-input.isOpen{
      display: block;
    }

  }
  &__buttons{
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
  }
} 
</style>