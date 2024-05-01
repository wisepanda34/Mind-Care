<!-- pages/clients.vue -->
<script setup lang="ts">
import { ref } from 'vue';
import Dropzone from '~/components/UI/Dropzone.vue';

const files = ref<File[]>([]); 
const maxFiles = 6
const maxSize = 1 * 1024 * 1024

const getFileUrl = (file: File): string => {
  return URL.createObjectURL(file);
}

const deleteFile = (index: number) => {
  files.value = files.value.filter((file, i) => i !== index)
}
</script>

<template>
  <div class="clients">
    <div class="clients__drobzone">
       <Dropzone 
          v-model="files" 
          textDrag="Drag & drop one file"
          :maxFiles="maxFiles"
          :multiple="true"
          :maxSize="maxSize"
        />
    </div>
   
    <div v-if="files.length>0">
      <div v-for="(file, index) in files" :key="index" class="clients__photo">
          <img :src="getFileUrl(file)" :alt="file.name">
          <div class="clients__photo-delete" @click.stop="deleteFile(index)">X</div>
        </div>
      </div>
  </div>
</template>
<style scoped lang="scss">
.clients{
  &__drobzone{
    width: 200px;
    min-height: 150px;
  }
  &__photo{
    position: relative;
    margin-top: 50px;
    width: 200px;
    height: 200px;
    user-select: none;

    display: flex;
    justify-content: center;
    align-items: center;

    img{
      width: auto;
      height: auto;
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
    &-delete{
      position: absolute;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: 3px solid #494949;

      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      font-weight: 300;
      cursor: pointer;
    }
  }
}
</style>