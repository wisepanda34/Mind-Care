<!-- pages/admin.vue -->
<script setup lang='ts'>


definePageMeta({
  middleware: ['only-admin'],
  layout: 'layout-admin'
});


</script>
 
<template>
  <div>
    <h1>ADMIN PANEL</h1>
  </div>
</template>
 