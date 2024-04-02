<!-- components/Header.vue -->
<script setup lang='ts'>
import { useAuthStore } from '@/stores/auth.store';


const authStore = useAuthStore()
const isAvaMenuOpen = ref(false)

const openAvatarMenu = () => {
  isAvaMenuOpen.value = true
}
const closeAvatarMenu = () => {
  isAvaMenuOpen.value = false
}

const editProfile = () => {
  console.log('/profile');
  navigateTo('/profile')
}

const logout = () => {
  authStore.fetchLogout()
  closeAvatarMenu()
  console.log('logout');
  
}

</script>
 
<template>
  <section class="header" @mousedown.self="closeAvatarMenu" >
    <UILogo/>
    <nav class="header__nav">
      <nuxt-link class="header__nav-item" to="/" exact-active-class="active">Company</nuxt-link>
      <nuxt-link class="header__nav-item" to="/specialists" exact-active-class="active">Our specialists</nuxt-link>
      <nuxt-link class="header__nav-item" to="/reviews" exact-active-class="active">Reviews</nuxt-link>
    </nav>
    <div class="header__user">
      <div v-if="!authStore.isAuthed" class="header__user-enter" @click="authStore.toggleAuthModal">Enter</div>
      <div v-if="authStore.isAuthed" class="header__user-profile" @click="openAvatarMenu">
        <div class="header__user-ava">
          <NuxtImg src="images/empty-avatar.jpg" alt="ava"/>
        </div>
        <div class="header__user-menu" :class="{ 'active': isAvaMenuOpen }" @click.stop ="closeAvatarMenu" >
          <ul>
            <li @click="editProfile">Edit profile</li>
            <li @click="logout">Exit</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
 
<style scoped lang='scss'>
 .header {
  height: 80px;
  margin-top: 20px;
  padding: 10px 20px;
  background: $gradient-header;

  display: flex;
  justify-content: space-between;
  align-items: center;

  
  &__nav{
    display: flex;

    &-item{
      white-space: nowrap;
      padding: 0 20px;

      color: $blue-100;
      font-weight: 700;
      font-size: 20px;
    }
    &-item.active{
      color: $purple-active;
    }
  }
  &__user{
    color: $blue-100;
    font-size: 20px;
    cursor: pointer;
  }
  &__user-profile{
    position: relative;
    
  }
  &__user-ava{
    width: 39px;
    border-radius: 50%;
    overflow: hidden;
    img{
      width: 100%;
      height: auto; 
      display: block;
    }
  }
  &__user-menu{
    position: absolute;
    display: none;
    top: 45px;
    right: 0;
    width: 120px;
    height: auto;

    background: $white;
    border-radius: $radius-3;
    box-shadow: $shadow-1;
    z-index: 10;

    font-size: 18px;
    color: $grey-5;

    li{
      transition: all 0.3s;
      padding: 6px;

      &:hover{
        background: $blue-200;
      }
    }
  }
  &__user-menu.active{
    display: block;
  }
 }
</style>