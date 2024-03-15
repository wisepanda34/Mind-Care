<!-- pages/specialists.vue -->
<script setup lang='ts'>
  const response = await fetch('/api/doctor')
  const doctors = await response.json();
  
  const chooseDoctor = (index: string) => {
    console.log('chooseDoctor', index);
  }
</script>
 
<template>
  <div class="doctor">
    <h1 class="text--fz30 text--fw700 text-center">Our specialists</h1>
    <ul class="doctor__list">
      <li class="doctor__card" v-for="(doctor, index) in doctors" :key="doctor._id" @click="chooseDoctor(doctor._id)">

        <div class="doctor__avatar"></div>
        <div class="doctor__info">
          <p class="text--fz24 text--fw700" >{{ doctor.name }} {{ doctor.surname }}</p>
          <p class="text--fz24">experience years: {{ doctor.experience }}</p>
          <div class="doctor__specialization text--fz24">
            specialization: 
            <span class="text--fz20" v-for="(item, i) in doctor.specialization" :key="i">
              {{ item }},
            </span>
          </div>
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
  }
  &__info{
    p{
      margin-bottom: 10px;
    }
  }
  &__specialization{

  }
}
</style>