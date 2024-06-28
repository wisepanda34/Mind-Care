<!-- components/Header.vue -->
<script setup lang='ts'>
import { useAuthStore } from '@/stores/auth.store';

const authStore = useAuthStore()
const isMenuOpened = ref(false)

const toggleMenu = () => {
  if (window.innerWidth <= 900) {
    isMenuOpened.value = !isMenuOpened.value
    if (isMenuOpened.value) {
        document.body.classList.add('no-scroll')
    } else {
      document.body.classList.remove('no-scroll')
    }
  }
}
</script>
 
<template>
  <header class="header">
    <div class="container">
      <div class="header__wrapper">
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
          <nuxt-link class="header__nav-item" to="/contacts" exact-active-class="active">Contacts</nuxt-link>
          
          <nuxt-link v-if="authStore.user.role === 'admin'" class="header__nav-item" to="/admin" exact-active-class="active" @click="toggleMenu">Admin</nuxt-link>
        </nav>
        <UIUserMenu :user-avatar="authStore.user.avatar ? authStore.user.avatar : 'images/empty-avatar.jpg'"/>
      </div>
    </div>
  </header>

  <!-- Full-screen mobile menu -->
  <div :class="['mobile-menu', { open: isMenuOpened }]">
    <span class="mobile-menu__close" @click="toggleMenu">
      <svg width="40" height="40" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <path fill="#c3d2ff" fill-rule="evenodd" clip-rule="evenodd" d="M4.11 2.697L2.698 4.11 6.586 8l-3.89 3.89 1.415 1.413L8 9.414l3.89 3.89 1.413-1.415L9.414 8l3.89-3.89-1.415-1.413L8 6.586l-3.89-3.89z"></path>
      </svg>    
    </span>
    <nav class="mobile-menu__nav">
      <nuxt-link class="mobile-menu__nav-item" to="/" exact-active-class="active" @click="toggleMenu">Company</nuxt-link>
      <nuxt-link class="mobile-menu__nav-item" to="/specialists" exact-active-class="active" @click="toggleMenu">Our specialists</nuxt-link>
      <nuxt-link class="mobile-menu__nav-item" to="/reviews" exact-active-class="active" @click="toggleMenu">Reviews</nuxt-link>
      <nuxt-link class="mobile-menu__nav-item" to="/contacts" exact-active-class="active" @click="toggleMenu">Contacts</nuxt-link>

      <nuxt-link v-if="authStore.user.role === 'admin'" class="mobile-menu__nav-item" to="/admin" exact-active-class="active" @click="toggleMenu">Admin</nuxt-link>
    </nav>
  </div>
</template>
 
<style scoped lang='scss'>
.header {
  height: 80px;
  margin-top: 20px;
  background: $gradient-header;

  &__wrapper {
    padding: 10px 20px;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__burger {
    display: none;
    flex-direction: column;
    justify-content: space-around;
    width: 30px;
    height: 30px;
    cursor: pointer;

    span {
      display: block;
      height: 3px;
      background-color: white;
      border-radius: 1px;
    }
  }

  &__nav {
    display: flex;

    &-item {
      white-space: nowrap;
      padding: 0 20px;

      color: $blue-100;
      font-weight: 700;
      font-size: 20px;
    }

    &-item.active {
      color: $purple-active;
    }
  }
}

.mobile-menu {
  position: fixed;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: $gradient-footer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  transition: left 0.3s ease-in-out;

  &.open {
    left: 0;
  }

  &__close {
    position: absolute;
    top: 40px;
    right: 40px;
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
  .header {
    &__burger {
      display: flex;
    }

    &__nav {
      display: none;
    }
  }
}
</style>
