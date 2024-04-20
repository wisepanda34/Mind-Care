<!-- pages/specialists/[id].vue -->
<script setup lang="ts">
import { IDoctor } from '~/types/auth.type';


const router = useRouter();
const route = useRoute();
const doctor = ref<IDoctor | null>(null);
const doctorId = router.currentRoute.value.params.id;

const fetchDoctorDetails = async () => {
  
  const response = await fetch(`/api/doctor/${route.params._id}}`);
  const data = await response.json();
  doctor.value = data;
};

onMounted(() => {
  fetchDoctorDetails();
});
</script>

<template>
  <div class="doctor-details">
    DOCTOR
    <pre>{{ doctorId }}</pre>
    <pre>{{ doctor }}</pre>
    <!-- <h1>{{ doctor.name }} {{ doctor.surname }}</h1>
    <p>Experience: {{ doctor.experience }} years</p>
    <p>Specializations: {{ doctor.specialization.join(', ') }}</p> -->
    <!-- Дополнительная информация о докторе -->
  </div>
</template>

<style scoped lang="scss">
.doctor-details {
  /* Стили для страницы с деталями доктора */
}
</style>
