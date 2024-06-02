<!-- components/UI/Logo.vue -->
<script setup lang='ts'>
 
</script>
 
<template>
  <div >
      <nuxt-link class="logo" to="/">
        <NuxtImg src="mind-care.svg" alt="logo"/>
        <div class="logo__name">Mind <br> Care</div>
      </nuxt-link>
    </div>
</template>
 
<style scoped lang='scss'>
 .logo{
  display: flex;
  user-select: none;
  img{
    width: 60px;
    height: 60px;
    border-radius: 5px;

  }
  &__name{
    padding: 0 10px;
    font-style: italic;
    font-size: 24px;
    color: $blue-100;
    font-weight: 700;
    display: flex;
    align-items: center;
  }
}
</style>