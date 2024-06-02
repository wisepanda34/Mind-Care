<!-- app.vue -->
<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store';

const authStore = useAuthStore()
const showUIPageUp = ref(false);

const handleScroll = () => {
  if (window.scrollY > 80) {
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
          <NuxtPage class="page" />
      </NuxtLayout>
      <AuthModal/>
      <UIMessageModal/>
      <UIPageUp v-if="showUIPageUp" class="pageUpFixed" @click="scrollToTop"/>
    </Body>
  </Html>
</template>

<style scoped lang='scss'>
.pageUpFixed{
  position: fixed;
  right: 30px;
  bottom: 60px;
}
</style>
