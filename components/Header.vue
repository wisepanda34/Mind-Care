<!-- components/Header.vue -->
<script setup lang='ts'>
 

 const openModalLogin = () => {
  
 }
</script>
 
<template>
  <section class="header">
    <div class="header__logo">
      <img src="../public/mind-care.svg" alt="logo">
      <div class="header__logo-name">Mind <br> Care</div>
    </div>
    <nav class="header__nav">
      <nuxt-link class="header__nav-item" to="/">Main</nuxt-link>
      <nuxt-link class="header__nav-item" to="/specialists">Our specialists</nuxt-link>
      <nuxt-link class="header__nav-item" to="/reviews">Reviews</nuxt-link>
    </nav>
    <div class="header__user">
      <div class="header__user-enter" @click="openModalLogin">Enter</div>
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

  &__logo{
    display: flex;
    
    img{
      width: 60px;
      height: 60px;
      border-radius: 5px;

    }
    &-name{
      padding: 0 10px;
      font-style: italic;
      font-size: 24px;
      color: $blue-100;
      font-weight: 700;
      display: flex;
      align-items: center;

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
  }
  &__user{
    color: $blue-100;
    font-size: 20px;
    cursor: pointer;
  }
 }
</style>