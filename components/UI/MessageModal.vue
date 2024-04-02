<!-- components/AuthModal.vue -->
<script setup lang='ts'>
import { ENTER } from '~/constants';
import Login from '/components/auth/Login.vue';
import Registration from '/components/auth/Registration.vue';
import { useAuthStore } from '@/stores/auth.store';

const authStore = useAuthStore()
 
</script>
 
<template>
  <Teleport to="body">
    <div class="modal" @mousedown.self="authStore.closeMessageModal" @click.stop>
      <Transition name="slide-fade">
        <div class="modal__content">
         <p class="text-center">{{ authStore.textMessageModal }}</p>
         <span class="modal__close" @click="authStore.closeMessageModal">x</span>
        </div>
      </Transition>
    </div>
  </Teleport>
</template>
 
<style scoped lang='scss'>
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 3s ease-out;
}

.slide-fade-enter-from, .slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>