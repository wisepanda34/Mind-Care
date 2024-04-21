<!-- components/UI/Input.vue -->
<script setup lang='ts'>

const props = defineProps(['modelValue', 'id', 'type', 'label']);
const emits = defineEmits(['update:modelValue', 'focus', 'blur']);
const isPasswordVisible = ref(false)

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

const clearField = () => {
  emits('update:modelValue', '');
}
const showPassword = () => {
  isPasswordVisible.value = true
}
const hidePassword = () => {
  isPasswordVisible.value = false;
};

</script>
 
<template>
  <div class="input">
    <label class="input__label" :for="id">{{ label }}</label>
    <input 
      v-if="type !== 'password'"
      class="input__field" 
      :type="type"
      :id="id"
      :value="modelValue" 
      :autocomplete="getAutocompleteType(type)"
      @input="onInput" 
      @focus="$emit('focus')"
      @blur="$emit('blur')"
    />
    <input 
      v-else
      class="input__field" 
      :type="isPasswordVisible ? 'text' : 'password'"
      :id="id"
      :value="modelValue" 
      :autocomplete="getAutocompleteType('password')"
      @input="onInput" 
      @focus="$emit('focus')"
      @blur="$emit('blur')"
    />

    <div v-if="type === 'password'" class="input__show"  @mousedown="showPassword" @mouseup="hidePassword">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
        <path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z"/>
      </svg>
    </div>
    <div class="input__clear" @click="clearField">X</div>
  </div>

</template>
 
<style scoped lang='scss'>
.input{
  position: relative;
  padding: 3px 0;
  &__label{
    font-size: 18px;
  }
  &__clear{
    position: absolute;
    top: 58%;
    right: 15px;
    transform: scaleX(1.3);

    font-size: 12px;
    color: $grey-5;
    cursor: pointer;
  }
  &__show{
    position: absolute;
    top: 56%;
    right: 40px;
    width: 20px;

    cursor: pointer;
    svg{
      fill: $grey-5; 
      width: 100%;
      height: auto;
    }
  }
  &__field{
    width: 100%;
    height: 35px;
    border-radius: 4px;
    padding: 20px;
    border: 1px solid $grey-5;
    margin-top: 5px;
    font-size: 18px;

    &:hover{
      border: 1px solid $grey-7;
    }

    &:focus{
      border: 1px solid $green-ok-bg;
    }
  }
} 
</style>