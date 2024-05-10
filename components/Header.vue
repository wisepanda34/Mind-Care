<!-- components/Header.vue -->
<script setup lang='ts'>
import { useAuthStore } from '@/stores/auth.store';


const authStore = useAuthStore()

</script>
 
<template>
  <section class="header">
    <UILogo/>
    <nav class="header__nav">
      <nuxt-link class="header__nav-item" to="/" exact-active-class="active">Company</nuxt-link>
      <nuxt-link class="header__nav-item" to="/specialists" exact-active-class="active">Our specialists</nuxt-link>
      <nuxt-link class="header__nav-item" to="/reviews" exact-active-class="active">Reviews</nuxt-link>
      <nuxt-link v-if="authStore.user.role === 'admin'" class="header__nav-item" to="/admin" exact-active-class="active">Admin</nuxt-link>

    </nav>
    <UIUserMenu user-avatar="images/empty-avatar.jpg"/>
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
 }
</style>