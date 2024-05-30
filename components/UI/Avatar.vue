<!-- components/UI/Avatar.vue  -->
<script setup lang='ts'>
import Filepond from 'vue-filepond';
import registredPlugin from 'vue-filepond';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';


const avatarFile = ref<File[]>([])

const handleUpdateAvatar = (file: any) => {
  avatarFile.value = file
}
</script>
 
<template>
  <div class="avatar">
    <file-pond
        ref="pond"
        :files="avatarFile"
        allow-multiple="false"
        accepted-file-types="image/*"
        @updatefiles="handleUpdateAvatar"
      />
  </div>
</template>
 
<style scoped lang='scss'>
 .avatar {
  max-width: 400px;
  margin: auto;
}
</style>