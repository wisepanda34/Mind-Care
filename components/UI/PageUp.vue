<!-- components/UI/PageUp.vue -->
<script setup lang='ts'>
 
</script>
 
<template>
  <div class="pageup">
    <NuxtImg src="svg/arrow-up-solid.svg" alt="svg"/> 
  </div>
</template>
 
<style scoped lang='scss'>
 .pageup{
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: $blue-300;
  opacity: 0.5;

  display: flex;
  justify-content: center;
  align-items: center;

  img{
    width: 15px;
  }
 }
</style>