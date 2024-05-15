<!-- components/UI/Button.vue -->
<script setup lang='ts'>
const props = defineProps({
  text: String,
  width: {
    type: String,
    default: '80px' // Устанавливаем значение по умолчанию
  }
});

</script>
 
<template>
  <button 
    class="btn"
    :style="{ width: width }"
    type="button"
  >
   <span>{{ text }}</span>
  </button>
</template>
 
<style scoped lang='scss'>
  .btn{
    height: 40px;
    
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;

    border: 2px solid $green;
    background: $green-1;
    border-radius: 3px;
    box-shadow: -3px 5px 10px 1px $grey-3;

    &:hover{
      background: $green-2;
    }
  }
  .btn-ok{
    border: 2px solid $green-ok;
    background: $green-ok-bg;

    &:hover{
      background: $green-hover;
    }
  }
  .btn-reset{
    border: 2px solid $green-ok;
    background: $grey-2;

    &:hover{
      background: rgb(225, 224, 224);
    }
  }
</style>