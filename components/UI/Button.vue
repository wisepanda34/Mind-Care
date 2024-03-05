<!-- components/UI/Button.vue -->
<script setup lang='ts'>
const props = defineProps(['text']);

</script>
 
<template>
  <button 
    class="btn"
    type="button"
  >
   <span>{{ text }}</span>
  </button>
</template>
 
<style scoped lang='scss'>
  .btn{
    min-width: 80px;
    height: 40px;
    
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;

    border: 1px solid $purple;
    border-radius: 3px;
  }
</style>