<!-- pages/specialists/index.vue -->
<script setup lang='ts'>
import type {IDoctor, IUser} from '@/types/auth.type'
import { useAuthStore } from "~/stores/auth.store";

const authStore = useAuthStore()


// Property '_id' does not exist on type 'never'.
  const doctors = ref<IUser[]>([]);

  const fetchDoctors = async() => {
    try{
      const response = await fetch('/api/doctors/specialists')
      if(!response.ok){
        throw new Error('response is not OK')
      }
      const fetchedDoctors: IUser[] = await response.json();
      doctors.value = fetchedDoctors;

    } catch(error) {
      console.log('getDoctors error:', error);
    }
  }
  
  const chooseDoctor = (id: string) => {
    if(!authStore.isAuthed){
      authStore.toggleAuthModal()
    } else navigateTo(`/specialists/${id}`)
  }

  onMounted(fetchDoctors)
  
</script>
 
<template>
  <div class="doctor">
    <h1 class="text--fz30 text--fw700 text-center">Our specialists</h1>
    <ul class="doctor__list">
      <li class="doctor__card" v-for="doctor in doctors" :key="doctor.id">

        <div class="doctor__avatar">
          <NuxtImg :src="doctor.info?.photoLink" :alt="`${doctor.surname}`"/>
        </div>
        <div class="doctor__info">
          <p class="text--fz24 text--fw700" >{{ doctor.name }} {{ doctor.surname }}</p>
          <p class="text--fz24">experience years: {{ doctor.info?.experience }}</p>
          <div class="doctor__specialization text--fz24">
            specialization: 
            <span class="text--fz20" v-for="(item, i) in doctor.info?.specialization" :key="i">
              {{ item }},
            </span>
          </div>
        </div>
        <div class="doctor__consultation">
          <UIButton
            text="Сonsultation"
            @click="chooseDoctor(doctor.id)"
          />
        </div>  

      </li>
    </ul>
    
  </div>
</template>
 
<style scoped lang='scss'>
.doctor{
  &__list{

  }
  &__card{
    display: flex;
    gap: 40px;
    margin-top: 30px;

    border: 1px solid $grey-2;
    border-radius: $radius-12;
    padding: 20px;

    box-shadow: $shadow-5;
  }
  &__avatar{
    width: 150px;
    height: 200px;
    background: $grey-3;
    border-radius: $radius-8;
    overflow: hidden;

    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &__info{
    p{
      margin-bottom: 10px;
    }
  }
  &__specialization{

  }
  &__consultation{
    margin-left: auto;
    padding: 10px;
  }
}
</style>