<!-- components/BirthdayPicker.vue -->
<script setup lang='ts'>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const props = defineProps<{date: Date | null, label: string;}>();
const emit = defineEmits(['update:selectedDate']);

const type = 'date'; // Тип выбора (date, month, year)
const minDate = '1900-01-01'; 
const maxDate = new Date().toISOString().split('T')[0]; 

const dateValue = ref<Date | null>(null);

watch(() => props.date, (newValue) => {
  updateDateValue(newValue);
});

onMounted(() => {
  updateDateValue(props.date);
});
const updateDateValue = (value: Date | null) => {
  if (value) {
    dateValue.value = value;
  } else {
    dateValue.value = null;
  }
};

const handleChangeDate = (value: Date | null) => {
  emit('update:selectedDate', value); 

  if (!value) { 
    emit('update:selectedDate', null);
  }
};

</script>
 
<template>
  <div class="vuedatepicker">
    <div class="vuedatepicker__label">Birthday</div>
      <VueDatePicker 
        class="vuedatepicker__custom"
        :model-value="dateValue" 
        :type="type" 
        :min="minDate" 
        :max="maxDate" 
        placeholder="Select Date" 
        @update:model-value="handleChangeDate"
      />
    </div>
</template>
 
<style scoped lang='scss'>
 .vuedatepicker{
  &__label{
    font-size: 18px;
    margin: 0px 0 5px 0;
  }
  &__custom{
    height: 60px;
    input{
            border: black; 
          }
    .dp__action_row{
      gap: 20px;
    }
  }
 }
 .vuedatepicker__custom {
  --dp-text-color: inherit;
  --dp-border-color: #9898a1;
  --dp-font-size: 16px;
  --dp-input-padding: 8px;
  --dp-primary-color: #ffae00;
 
}
</style>