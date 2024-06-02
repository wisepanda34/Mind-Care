<!-- components/AuthModal.vue -->
<script setup lang='ts'>
import { useAuthStore } from '@/stores/auth.store';

const authStore = useAuthStore()
 
</script>
 
<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="authStore.isOpenMessageModal" class="modal" @mousedown.self="authStore.closeMessageModal" @click.stop>
        <div class="modal__content">
         <p class="text-center text--fz20">{{ authStore.textMessageModal }}</p>
         <span class="modal__close" @click="authStore.closeMessageModal">x</span>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
 
<style scoped lang='scss'>
@import '@/assets/mixins/animations';
.fade {
  @include fade;
}
</style>