<!-- app.vue -->
<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store';

const authStore = useAuthStore()

</script>
<template>
 <Html>
    <Body>
      <NuxtLayout >
        <NuxtLoadingIndicator
            :height="5"
            :duration="3000"
            :throttle="400"
        />
        <NuxtPage class="page"/>
      </NuxtLayout>
      <AuthModal v-if="authStore.isOpenAuthModal"/>
    </Body>
  </Html>
</template>
