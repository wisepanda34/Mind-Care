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
         <span class="modal__close" @click="authStore.closeMessageModal">
          <svg width="18" height="18" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.11 2.697L2.698 4.11 6.586 8l-3.89 3.89 1.415 1.413L8 9.414l3.89 3.89 1.413-1.415L9.414 8l3.89-3.89-1.415-1.413L8 6.586l-3.89-3.89z" fill="#4b4b4c"></path>
          </svg>
         </span>
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