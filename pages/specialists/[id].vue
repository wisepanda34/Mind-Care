<!-- pages/doctors/[id].ts -->
<script setup lang="ts">
import { IDoctor } from '~/types/auth.type';


const router = useRouter();
const route = useRoute();
const doctor = ref<IDoctor | null>(null);
const doctorId = router.currentRoute.value.params.id;

const fetchDoctorDetails = async () => {
  const response = await fetch(`/api/doctors/${doctorId}`);
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
    <h1>{{ doctor?.name }} {{ doctor?.surname }}</h1>
    <p>Experience: {{ doctor?.info?.experience }} years</p>
    <p>Specializations: {{ doctor?.info?.specialization?.join(', ') }}</p>
  </div>
</template>

<style scoped lang="scss">
.doctor-details {
  /* Стили для страницы с деталями доктора */
}
</style>
