<!-- components/UI/Role.vue -->
<script setup lang='ts'>
import { ROLE } from '~/constants'

const roleLabels: Record<ROLE, string> = {
  [ROLE.CLIENT]: 'Client',
  [ROLE.DOCTOR]: 'Doctor',
  [ROLE.ADMIN]: 'Admin'
};

const selectedRole = ref(roleLabels[ROLE.CLIENT]);
const isSelectOpen = ref(false)

const emits = defineEmits(['update:selectedRole'])

const changeRole = (role: ROLE) => {
  selectedRole.value = roleLabels[role];
  toggleSelect();
  emits('update:selectedRole', role);
};

const toggleSelect = () => {
  isSelectOpen.value = !isSelectOpen.value
}

</script>
 
<template>
  <div class="role">
    <div 
      class="role__installed" 
      :class="isSelectOpen ? 'isHidden' : null"
      @click="toggleSelect"
    >
      {{ selectedRole }}
    </div>
    <div 
      class="role__select"
      :class="isSelectOpen ? 'isOpen' : null"
    >
      <ul>
        <li 
          class="role__item" 
          v-for="(label, role) in roleLabels" 
          :key="role"
          @click="changeRole(role)"
        >
          {{ label }}
        </li>
      </ul>
    </div>
  </div>
</template>
 
<style scoped lang='scss'>
.role{
  position: relative;
  width: 80px;
  height: 26px;
  

  &__installed{
    height: 100%;

    border: 1px solid $grey-5;
    border-radius: 13px;

    display: flex;
    justify-content: center;
    padding: 4px 0;

    cursor: pointer;
  }
  &__installed.isHidden{
    opacity: 0;
  }

  &__select{
    position: absolute;
    top: 0;
    left: 0px;
    width: 80px;
    height: 78px;
    border: 1px solid $grey-5;
    border-radius: 13px;
    overflow: hidden;
    z-index: 20;

    display: none;
  }
  &__select.isOpen{
    display: block;
  }
  &__item{
    height: 26px;

    display: flex;
    justify-content: center;
    padding: 4px 0;

    cursor: pointer;

    &:hover{
      background: $grey-1;
    }
  }
}
</style>