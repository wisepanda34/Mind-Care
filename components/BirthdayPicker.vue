<!-- components/BirthdayPicker.vue -->
<script setup lang='ts'>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import {parseShortDate, formatDate} from '~/utils/convertDate'

const props = defineProps<{date: Date | null, label: string;}>();
const emit = defineEmits(['update:selectedDate', 'focus', 'blur']);

const type = 'date'; 
const minDate = '1900-01-01'; 
const maxDate = new Date().toISOString().split('T')[0]; 
const dateValue = ref<Date | null>(null);

const updateDateValue = (value: Date | string | null) => {
  if (value instanceof Date) dateValue.value = new Date(value.getFullYear(), value.getMonth(), value.getDate());
  else if (typeof value === 'string') dateValue.value = parseShortDate(value);
  else if (value === null) dateValue.value = null; 
  else throw new Error('updateDateValue error with type') 
};

const handleChangeDate = (value: Date | null) => {
  emit('update:selectedDate', value); 
  if (!value) emit('update:selectedDate', null);
};

watch(() => props.date, (newValue) => {
  updateDateValue(newValue);
});

onMounted(() => {
  updateDateValue(props.date);
});
</script>
 
<template>
  <div class="vuedatepicker">
    <div class="vuedatepicker__label">Birthday</div>
      <VueDatePicker 
        class="vuedatepicker__custom"
        :model-value="dateValue" 
        :type="type" 
        :format="formatDate" 
        :min="minDate" 
        :max="maxDate" 
        :enable-time-picker="false"
        placeholder="Select Date" 
        @update:model-value="handleChangeDate"
        @focus="$emit('focus')"
        @blur="$emit('blur')"
      />
    </div>
</template>
 
<style scoped lang='scss'>
 .vuedatepicker{
  margin-top: 10px;
  &__label{
    font-size: 18px;
    margin: 0px 0 5px 0;
  }
  &__custom{
    height: 50px;
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