<!-- components/AuthModal.vue -->
<script setup lang='ts'>
import { ENTER } from '~/constants';
import Login from '/components/auth/Login.vue';
import Registration from '/components/auth/Registration.vue';
import { useAuthStore } from '@/stores/auth.store';

const authStore = useAuthStore()
const isVisible = ref(false);

const afterEnter = () => {
  isVisible.value = true;
}; 
</script>
 
<template>
  <Teleport to="body">
    <div class="modal" @mousedown.self="authStore.toggleAuthModal" @click.stop>
      <Transition name="slide-fade" @after-enter="afterEnter">
        <div class="modal__white">
          <Login v-if="authStore.processAuth === ENTER.LOGIN"/>
          <Registration v-if="authStore.processAuth === ENTER.REGISTRATON"/>
        </div>
      </Transition>
    </div>
  </Teleport>
</template>
 
<style scoped lang='scss'>
.slide-fade{
  &-enter-from,
  &-leave-to {
    opacity: 0;
  }

  &-enter-active,
  &-leave-active {
    transition: 0.8s ease;
  }
}
// .slide-fade-enter-active, .slide-fade-leave-active {
//   transition: opacity 1s ease-in-out, transform 0.3s ease-in-out; 
//   opacity: 1;
//   transform: translateY(0)
// }

// .slide-fade-enter-from, .slide-fade-leave-to {
//   transform: translateY(20px);
//   opacity: 0;
// }
</style>