<!-- app.vue -->
<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store';

const authStore = useAuthStore()
const showUIPageUp = ref(false);

const handleScroll = () => {
  if (window.scrollY > 500) {
    showUIPageUp.value = true;
  } else {
    showUIPageUp.value = false;
  }
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

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
      <AuthModal v-if="authStore.isOpenAuthModal" />
      <UIPageUp v-if="showUIPageUp" class="pageUpFixed" @click="scrollToTop"/>
    </Body>
  </Html>
</template>

<style scoped>
.pageUpFixed{
  position: fixed;
  right: 30px;
  bottom: 60px;
}
</style>
