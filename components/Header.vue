<!-- components/Header.vue -->
<script setup lang='ts'>
import { useAuthStore } from '@/stores/auth.store';

const authStore = useAuthStore()
const isMenuOpened = ref(false)

const toggleMenu = () => {
  isMenuOpened.value = !isMenuOpened.value
}

</script>
 
<template>
  <section class="header">
    <div class="header__burger" @click="toggleMenu">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <UILogo/>
    <nav class="header__nav user-none">
      <nuxt-link class="header__nav-item" to="/" exact-active-class="active">Company</nuxt-link>
      <nuxt-link class="header__nav-item" to="/specialists" exact-active-class="active">Our specialists</nuxt-link>
      <nuxt-link class="header__nav-item" to="/reviews" exact-active-class="active">Reviews</nuxt-link>
      <nuxt-link v-if="authStore.user.role === 'admin'" class="header__nav-item" to="/admin" exact-active-class="active">Admin</nuxt-link>
    </nav>
    <UIUserMenu :user-avatar="authStore.user.avatar ? authStore.user.avatar : 'images/empty-avatar.jpg'"/>
  </section>

  <!-- Full-screen mobile menu -->
  <div v-if="isMenuOpened" class="mobile-menu">
    <span class="mobile-menu__close" @click="toggleMenu">X</span>
    <nav class="mobile-menu__nav">
      <nuxt-link class="mobile-menu__nav-item" to="/" exact-active-class="active" @click="toggleMenu">Company</nuxt-link>
      <nuxt-link class="mobile-menu__nav-item" to="/specialists" exact-active-class="active" @click="toggleMenu">Our specialists</nuxt-link>
      <nuxt-link class="mobile-menu__nav-item" to="/reviews" exact-active-class="active" @click="toggleMenu">Reviews</nuxt-link>
      <nuxt-link v-if="authStore.user.role === 'admin'" class="mobile-menu__nav-item" to="/admin" exact-active-class="active" @click="toggleMenu">Admin</nuxt-link>
    </nav>
  </div>
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

  &__burger{
    display: none;
    flex-direction: column;
    justify-content: space-around;
    width: 30px;
    height: 30px;
    cursor: pointer;

    span{
      display: block;
      height: 3px;
      background-color: white;
      border-radius: 1px;
    }
  }
  
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
 }
 .mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: $gradient-header;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  &__close{
    position: absolute;
    top: 40px;
    right: 40px;
    font-size: 40px;
    font-weight: 700;
    color: white;
    transform: scaleX(1.3);
    cursor: pointer;
  }

  &__nav {
    display: flex;
    flex-direction: column;
    align-items: center;

    &-item {
      margin: 20px 0;
      color: white;
      font-weight: 700;
      font-size: 30px;
      text-align: center;
    }

    &-item.active {
      color: $purple-active;
    }
  }
}


 @media (max-width: 900px) {
  .header{
    &__burger{
      display: flex;
    }
    &__nav{
      display: none;
    }
  }
 }
</style>