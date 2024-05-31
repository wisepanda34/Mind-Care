<!-- components/UI/Avatar.vue -->
<script setup lang='ts'>
import { ref, defineEmits } from 'vue';
import {AvatarEditor} from 'avatar-editor';

const props = defineProps<{img: string | undefined}>(); 
const emits = defineEmits(['update:modelValue']); 

const scaleVal = ref<number>(1);
const scaleStep = 0.02;
const scaleMin = 1;
const scaleMax = 3;
const avatarEditorRef = ref<any>(null);
const avatar = ref(props.img)

const onImageReady = (scale: number) => {
  scaleVal.value = scale;
};

const deleteImg = () => {
  if(avatarEditorRef.value) avatarEditorRef.value = null
  avatar.value = ''
  emits('update:modelValue', avatar.value);
}

const handleWheelEvent = (e: WheelEvent) => {
  if (e.deltaY > 0 && scaleVal.value - scaleStep >= scaleMin) {
    scaleVal.value -= scaleStep;
  } else {
    if (scaleVal.value + scaleStep <= scaleMax) scaleVal.value += scaleStep;
  }
};
const handleInputWheelEvent = (e: WheelEvent) => {
  e.preventDefault();
};

const save = () => {
  if (avatarEditorRef.value) {
    const canvasData = avatarEditorRef.value.getImageScaled();
    avatar.value = canvasData.toDataURL('image/png');
    emits('update:modelValue', avatar.value);
  }
};


onMounted(() => {
  document.addEventListener('wheel', handleWheelEvent);
  const inputElement = document.querySelector('.avatar__size') as HTMLInputElement;
  inputElement?.addEventListener('wheel', handleInputWheelEvent);
});

onUnmounted(() => {
  document.removeEventListener('wheel', handleWheelEvent);
  const inputElement = document.querySelector('.avatar__size') as HTMLInputElement;
  inputElement?.removeEventListener('wheel', handleInputWheelEvent);
});

</script>

<template>
  <div class="avatar">
    <div class="avatar__editor">
      <AvatarEditor
        :width="200"
        :height="200"
        :border="1"
        :borderRadius="100"
        :color="[237, 243, 255, 1]"
        ref="avatarEditorRef"
        @image-ready="onImageReady"
        v-model:scale="scaleVal"
      />
      <div class="avatar__delete" @click="deleteImg">
        <svg xmlns="http://www.w3.org/2000/svg" fill="#0191b5" viewBox="0 0 448 512"><!--! Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. -->
          <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/>
        </svg>
      </div>
    </div>
    <input
      class="avatar__size"
      type="range"
      :min="scaleMin"
      :max="scaleMax"
      :step="scaleStep"
      v-model="scaleVal"
    />
    <button class="avatar__button" @click="save">Ok</button>
  </div>
</template>

<style scoped lang='scss'>
.avatar {
  display: flex;
  flex-direction: column;
  gap: 20px;
  
  &__editor {
    position: relative;
    width: 200px;
    touch-action: none; /* Для предотвращения скроллинга при перемещении изображения */
  }
  &__delete{
    position: absolute;
    top: 5px;
    right: 5px;
    width: 20px;
    height: 15px;
    cursor: pointer;

  }
  &__size {
    display: block;
    width: 200px;
    height: 5px;
    background-color: #ddd; 
    border-radius: 5px; 
    outline: none; 

    &::-webkit-slider-runnable-track {
      height: 5px;
      background: $gradient-header;
      border-radius: 5px;
    }

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 15px;
      height: 15px;
      background: #0191b5;
      cursor: pointer;
      border-radius: 50%;
      margin-top: -5px; 
    }

    &::-moz-range-track {
      height: 5px;
      background: $gradient-header;
      border-radius: 5px;
    }

    &::-moz-range-thumb {
      width: 15px;
      height: 15px;
      background: #0191b5;
      cursor: pointer;
      border-radius: 50%;
    }

    &::-ms-track {
      width: 100%;
      height: 5px;
      background: transparent;
      border-color: transparent;
      color: transparent;
    }

    &::-ms-fill-lower {
      background: #0191b5;
      border-radius: 5px;
    }

    &::-ms-fill-upper {
      background: #0191b5;
      border-radius: 5px;
    }

    &::-ms-thumb {
      width: 15px;
      height: 15px;
      background: #0191b5;
      cursor: pointer;
      border-radius: 50%;
      margin-top: -5px; 
    }
  }

  &__button {
    width: 80px;
    height: 35px;
    margin: 0 auto;

    background: #0191b5;
    font-size: 18px;
    color: $white;
    border: 3px solid #0191b5; 
    border-radius: 4px; 

    display: flex;
    justify-content: center;
    align-items: center;
  }
}

</style>
