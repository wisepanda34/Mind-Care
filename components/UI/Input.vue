<!-- components/UI/Input.vue -->
<script setup lang='ts'>

const props = defineProps(['modelValue', 'id', 'type', 'label']);
const emits = defineEmits(['update:modelValue']);

const onInput = (event: Event) => {
  const inputValue = (event.target as HTMLInputElement).value;
  emits('update:modelValue', inputValue);
};

const getAutocompleteType = (type: string): string => {
  if (type === 'email') {
    return 'email'; // Для поля email используем автокомплит 'email'
  }
  // Другие типы полей могут использовать автокомплит по умолчанию
  return 'on';
};

</script>
 
<template>
  <div class="input">
    <label class="input__label" :for="id">{{ label }}</label>
    <input 
      class="input__field" 
      :type="type"
      :id="id"
      :value="modelValue" 
      :autocomplete="getAutocompleteType(type)"
      @input="onInput" 
    />
  </div>

</template>
 
<style scoped lang='scss'>
.input{
  padding: 10px 0;
  &__label{
    font-size: 18px;

  }
  &__field{
    width: 100%;
    height: 35px;
    border-radius: 4px;
    padding: 20px;
    border: 1px solid $grey-5;
    margin-top: 5px;

    &:hover{
      border: 1px solid $grey-7;
    }

    &:focus{
      border: 1px solid $green-ok-bg;
    }
  }
 

} 
</style>