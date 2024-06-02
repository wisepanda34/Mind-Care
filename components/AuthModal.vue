<!-- components/AuthModal.vue -->
<script setup lang='ts'>
import { ENTER } from '~/constants';
import Login from '/components/auth/Login.vue';
import Registration from '/components/auth/Registration.vue';
import { useAuthStore } from '@/stores/auth.store';

const authStore = useAuthStore()
const loginRef = ref();
const registrationRef = ref();

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    console.log('Enter');
    
    if (authStore.processAuth === ENTER.LOGIN) {
      if (authStore.processAuth === ENTER.LOGIN && loginRef.value) {
        loginRef.value.submitLogin();
      }
    }
    if (authStore.processAuth === ENTER.LOGIN && registrationRef.value) {
        registrationRef.value.submitRegistration();
      }
  } else if (event.key === 'Escape') {
    console.log('Esc');
    
    authStore.toggleAuthModal();
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
});
</script>
 
<template>
  <Teleport to="body">
    <transition name="slide-fade">
      <div class="modal" v-if="authStore.isOpenAuthModal" @mousedown.self="authStore.toggleAuthModal" @click.stop key="modal">
        <div class="modal__white" >
          <Login v-if="authStore.processAuth === ENTER.LOGIN" ref="loginRef"/>
          <Registration v-if="authStore.processAuth === ENTER.REGISTRATON" ref="registrationRef"/>
        </div>
      </div>
   </transition>
  </Teleport>
</template>
 
<style scoped lang='scss'>
@import '@/assets/mixins/animations';
.slide-fade {
  @include slide-fade;
}
</style>