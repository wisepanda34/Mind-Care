<!-- components/AuthModal.vue -->
<script setup lang='ts'>
  import { useModalStore } from '@/stores/modal.store';

  const modalStore = useModalStore()
  const emailRef = ref('')
  const passwordRef = ref('')

  const closeModal = () => {
      // Логика для закрытия модального окна
      console.log('closeModal');
      
  };

  const submitLogin = () => {
      // Логика залогинивания
      console.log('submitLogin');
  }

  const startRegistration = () => {
    console.log('startRegistration');
  }

  const restorePassword = () => {
    console.log('restorePassword');
  }

</script>
 
<template>
  <Teleport to="body">
    <Transition name="fade">
      <div class="modal" @mousedown.self="closeModal" @click.stop>
        <div class="modal__white">
          <div class="modal__header">
            <h3 class="text--fz24 text--fw700">Enter</h3>
            <div class="modal__close">X</div>
          </div>
          <div class="modal__body">
            <form class="modal__form">
              <UIInput
                v-model="emailRef"
                id="email"
                type="text"
                label="Email"
              />
              <p class="field-error text--red"></p>
              <UIInput
                v-model="passwordRef"
                id="password"
                type="text"
                label="Password"
              />
              <p class="field-error text--red"></p>
            </form>
            
          </div>
          <div class="modal__footer">
            <div>
              <span class="text--blue-600 curspoint" @click="restorePassword">Forgot password?</span>
            </div>
            <UIButton text="OK" @click="submitLogin"/>
            <div>
              <span class="text--green text--fz20 curspoint" @click="startRegistration">Registration</span>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
 
<style scoped lang='scss'>
.modal{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #000;
  opacity: 0.5;
  z-index: 10;

  display: flex;
  justify-content: center;
  align-items: center;
  

  &__white{
    width: 400px;
    height: 400px;
    background: white;
    border-radius: 5px;
    padding: 20px;

  }
  &__header{
    position: relative;
    margin-bottom: 20px;
  }
  &__close{
    position: absolute;
    top: 5px;
    right: 10px;
    font-size: 20px;
    cursor: pointer;
    transform: scaleX(1.2);
  }
  &__footer{
    display: grid;
    grid-template-columns: auto 100px;
    gap: 10px;
    padding: 30px 0;

  }
}
</style>
<!-- <Transition name="fade" v-if="modalStore.modalState?.component">
      <div class="modal" @mousedown.self="closeModal" @click.stop>
        <component :is="modalStore.modalState.component" :props="modalStore.modalState.props" />
      </div>
    </Transition> -->