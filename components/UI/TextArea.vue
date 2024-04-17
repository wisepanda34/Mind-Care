<!-- components/UI/Textarea.vue -->
<script setup lang='ts'>

const props = defineProps(['modelValue', 'id', 'label', 'placeholder']);
const emits = defineEmits(['update:modelValue']);

const onInput = (event: Event) => {
  const inputValue = (event.target as HTMLInputElement).value;
  emits('update:modelValue', inputValue);
};
</script>
 
<template>
  <div class="textarea">
    <textarea 
      class="textarea__field" 
      type="text"
      :id="id"
      :value="modelValue"
      :placeholder="placeholder" 
      autocomplete="on"
      @input="onInput" 
    />
  </div>
</template>
 
<style scoped lang='scss'>
.textarea{
  width: 100%;
  height: 150px;

  &__field{
    width: 100%;
    height: 100%;
    border: 1px solid $orange; 
    border-radius: 5px; 
    padding: 10px 10px; 
    font-size: 18px; 
    resize: none; 
    box-sizing: border-box; 
    background-color: #fff; 
  }
} 
</style>