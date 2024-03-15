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
    <div class="login" @mousedown.self="authStore.toggleAuthModal" @click.stop>
      <Transition name="slide-fade">
        <div class="login__white">
          <Login v-if="authStore.processAuth === ENTER.LOGIN"/>
          <Registration v-if="authStore.processAuth === ENTER.REGISTRATON"/>
        </div>
      </Transition>
    </div>
  </Teleport>
</template>
 
<style scoped lang='scss'>
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from, .slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>