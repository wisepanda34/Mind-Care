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
    <transition name="slide-fade">
      <div class="modal" v-if="authStore.isOpenAuthModal" @mousedown.self="authStore.toggleAuthModal" @click.stop key="modal">
        <div class="modal__white" >
          <Login v-if="authStore.processAuth === ENTER.LOGIN"/>
          <Registration v-if="authStore.processAuth === ENTER.REGISTRATON"/>
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