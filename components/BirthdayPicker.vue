<!-- components/BirthdayPicker.vue -->
<script setup lang='ts'>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const props = defineProps<{date: Date | null}>();
const emit = defineEmits(['update:selectedDate']);


const selectedDate = ref<Date | null>(props.date); 
const type = 'date'; // Тип выбора (date, month, year)
const minDate = '1900-01-01'; 
const maxDate = new Date().toISOString().split('T')[0]; 


const handleChangeDate = (value: Date | null) => {
  selectedDate.value = value;
  if (value) {
    emit('update:selectedDate', selectedDate.value); 
  }
};

</script>
 
<template>
  <div class="vuedatepicker">
    <div class="vuedatepicker__label">Birthday</div>
      <VueDatePicker 
        class="vuedatepicker__custom"
        :model-value="selectedDate" 
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