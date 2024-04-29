<!-- components/UI/Dropzone.vue -->
<script setup lang="ts">
import { useDropzone } from 'vue3-dropzone';

const props = defineProps<{
  modelValue: File[]; 
  textDrag: string;
  maxFiles: number;
  maxSize: number;
  multiple: boolean;
}>(); 

const emits = defineEmits(['update:modelValue']); 

const onDrop = (acceptFiles: File[], rejectReasons: any) => {
  if(props.maxFiles === 0 || props.modelValue.length < props.maxFiles) {
    const newFiles = props.multiple ? [...props.modelValue, ...acceptFiles] : [acceptFiles[0]];
    emits('update:modelValue', newFiles);
  }
}

const deleteFile = (file: File) => {
  const filteredFiles = props.modelValue.filter(f => f !== file);
  emits('update:modelValue', filteredFiles);
}

const { getRootProps, getInputProps, isDragActive, isDragAccept } = useDropzone({ onDrop });
</script>

<template>
  <div 
    class="dropzone" 
    :class="{ dragActive: isDragActive, dragAccept: isDragAccept }" 
    v-bind="getRootProps()"
  >
    <input v-bind="getInputProps()" />
    <p v-if="!modelValue.length">{{ textDrag }}</p>
    <div v-if="modelValue.length > 0" >
      <p v-if="props.multiple">Upload {{ props.maxFiles }} images</p>
      <p v-else>Selected file:</p>
      <div 
        v-for="file in modelValue" 
        :key="file.name"
        class="dropzone__selected"
      > 
        <p>{{ file.name }} </p>
        <div class="dropzone__delete" @click.stop="deleteFile(file)">X</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.dropzone {
  width: 400px;
  min-height: 150px;
  border: 1px solid gray;
  border-radius: 8px;
  background: #f0f5f8;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  user-select: none;

  &__selected {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    gap: 30px;
  }

  &__delete{
    min-width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 1px solid #494949;

    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 11px;
    font-weight: 500;
    cursor: pointer;
  }

  &.dragActive {
    background: teal !important;
  }
}
</style>