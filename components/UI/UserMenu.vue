<!-- components/UI/UserMenu.vue -->
<script setup lang='ts'>
import { useAuthStore } from '@/stores/auth.store';

const props = defineProps({ userAvatar: String })

const isMenuOpen = ref(false);
const authStore = useAuthStore();

const openMenu = () => {
  isMenuOpen.value = true;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

const editProfile = () => {
  navigateTo('/profile');
  closeMenu()
};

const logout = () => {
  authStore.fetchLogout();
  closeMenu();
};

const handleClickOutside = (event: MouseEvent) => {
  if (isMenuOpen.value) {
    const target = event.target as HTMLElement;
    const menuElement = document.querySelector('.user-menu__profile') as HTMLElement;

    if (!menuElement.contains(target)) {
      closeMenu();
    }
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

</script>
 
<template>
  <div class="user-menu">
    <div v-if="!authStore.isAuthed" class="user-menu__enter" @click="authStore.toggleAuthModal">Enter</div>
    <div v-if="authStore.isAuthed" class="user-menu__profile" @click="openMenu">
      <div class="user-menu__ava">
        <NuxtImg :src="userAvatar" alt="Avatar"/>
      </div>
      <div class="user-menu__menu" :class="{ 'active': isMenuOpen }" @click.stop="closeMenu">
        <ul>
          <li @click="editProfile">Edit profile</li>
          <li @click="logout">Exit</li>
        </ul>
      </div>
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
    width: 39px;
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
    display: none;
    top: 45px;
    right: 0;
    width: 120px;
    height: auto;

    background: $white;
    border-radius: $radius-3;
    box-shadow: $shadow-1;
    z-index: 10;

    font-size: 18px;
    color: $grey-5;

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
  }

}
</style>