<!-- components/UI/UserMenu.vue -->
<script setup lang='ts'>
import { useAuthStore } from '@/stores/auth.store';
import path from 'path';

const props = defineProps({userAvatar: String})

const isMenuOpen = ref(false);
const authStore = useAuthStore();

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value 
}

const editProfile = () => {
  toggleMenu()
  navigateTo('/profile');
};

const logout = () => {
  authStore.fetchLogout();
  toggleMenu();
};

const handleClickOutside = (event: MouseEvent) => {
  if (isMenuOpen.value) {
    const target = event.target as HTMLElement;
    const menuElement = document.querySelector('.user-menu__profile') as HTMLElement;

    if (menuElement && !menuElement.contains(target)) {
      toggleMenu();
    }
  }
};
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

const pathname = computed(() => {
  return window.location.pathname; // Получаем текущий путь страницы
});

</script>
 
<template>
  <div class="user-menu">
    <div v-if="!authStore.isAuthed" class="user-menu__enter" @click="authStore.toggleAuthModal">Enter</div>
    <div v-if="authStore.isAuthed" class="user-menu__profile" @click="toggleMenu">
      <div class="user-menu__ava">
        <NuxtImg :src="userAvatar" alt="Avatar"/>
      </div>
      <TransitionGroup name="fade">
        <div key="user-menu" class="user-menu__menu" :class="isMenuOpen ? 'active' : ''" @click.stop="toggleMenu">
          <ul>
            <li @click.stop="editProfile">Edit profile</li>
            <li @click.stop="logout">Exit</li>
          </ul>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>
 
<style scoped lang='scss'>

.user-menu{
  color: $blue-100;
  font-size: 20px;
  cursor: pointer;

  &__profile {
    position: relative;
  }
  &__ava {
    width: 60px;
    border-radius: 50%;
    overflow: hidden;

    img {
      width: 100%;
      height: auto;
      display: block;
    }
  }
  &__menu {
    position: absolute;
    // display: none;
    top: 65px;
    right: 0;
    width: 120px;
    height: auto;

    background: $white;
    border-radius: $radius-3;
    box-shadow: $shadow-1;
    z-index: 10;

    font-size: 18px;
    color: $grey-7;

    opacity: 0;
    transform: translateY(-3px);
    transition: all 0.3s ease;

    ul {
      padding: 0;
      margin: 0;
    }

    li {
      transition: all 0.3s;
      padding: 6px;

      &:hover {
        background: $blue-200;
      }
    }
  }

  &__menu.active {
    display: block;
    opacity: 1;
    transform: translateY(0);
  }

}
</style>