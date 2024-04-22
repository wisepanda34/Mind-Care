<!-- components/Profile.vue -->
<script setup lang='ts'>
import { useAuthStore } from '@/stores/auth.store';
import type { IUser, IUpdateUser } from '@/types/auth.type'
import { useVuelidate } from '@vuelidate/core'
import { helpers } from '@vuelidate/validators'
import BirthdayPicker from './BirthdayPicker.vue';
import { phoneRegex } from '~/constants';



const authStore = useAuthStore()
const  changePasswordText = ref('')
const reqAvailable = ref(true)
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
  &__buttons{
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
  }
} 
</style>