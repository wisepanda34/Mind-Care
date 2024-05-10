<!-- components/admin/header-admin.vue -->
<script setup lang='ts'>
 
</script>
 
<template>
  <div class="header-admin">
    <UILogo/>
    <UIUserMenu user-avatar="images/empty-avatar.jpg"/>
  </div>
</template>
 
<style scoped lang='scss'>
.header-admin{
  width: 100%;
  height: 80px;
  background: yellowgreen;
  padding: 10px;

  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>