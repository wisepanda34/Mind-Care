<!-- components/admin/AdminPanel.vue -->
<script setup lang='ts'>

import {formateDate} from '~/utils/formateDate'
import VueDatePicker from '@vuepic/vue-datepicker';


const optionsLimit = { '3': 3, '10': 10, 'all': 100 }
const optionsSort = { 'a-z': 1, 'z-a': 2, 'registered up': 3, 'registered down': 4, 'age up': 5, 'age down': 6 }
const categories = ['clients', 'doctors', 'admins']


const changedCategories = ref<String[]>(['clients'])
const searchUser = ref('')
const searchPhone = ref('')
const registredStart = ref<Date | string | null>(null)
const registredDates = {
  registredStart: ref<Date | string | null>(null),
  registredEnd: ref(new Date())
}
const birthdayDates = {
  birthdayStart: ref(new Date("1950-01-01")),
  birthdayEnd: ref(new Date())
}
const limit = ref<number>(3)
const sortMode = ref<number>(1)


const toggleCategory = (category: string) => {
  const index = changedCategories.value.indexOf(category);
  if (index === -1) changedCategories.value.push(category);
  else changedCategories.value.splice(index, 1);
};

const reset = () => {
  searchUser.value = ''
  searchPhone.value = ''
  registredDates.registredStart.value = new Date("2022-01-01")
  registredDates.registredEnd.value = new Date()
  birthdayDates.birthdayStart.value = new Date("1950-01-01")
  birthdayDates.birthdayEnd.value = new Date()
  limit.value = 3
  sortMode.value = 1
}
const q = ref<any>()
const submitRequest = async () => {
  const queries: String[] = [];

  if (changedCategories.value.length === 0) {
    console.log('return');
    return
  }
  const category = changedCategories.value.join(',');
  queries.push(`category=${encodeURIComponent(category)}`);

  if(searchUser.value.trim() !== '') queries.push(`searchUser=${encodeURIComponent(searchUser.value.trim())}`)

  if(searchPhone.value.trim() !== '') queries.push(`searchPhone=${encodeURIComponent(searchPhone.value.trim())}`);

  // const defaultRegistredStart = new Date("2022-01-01");
  // if (!datesEqual(registredDates.registredStart.value, defaultRegistredStart)) {
  //   const formattedRegistredStart = formateDate(registredDates.registredStart.value);
  //   queries.push(`registredStart=${formattedRegistredStart}`);
  // }

  // if (!datesEqual(registredDates.registredEnd.value, new Date())) {
  //   const formattedRegistredEnd = formateDate(registredDates.registredEnd.value);
  //   queries.push(`registredEnd=${formattedRegistredEnd}`);
  // }

  // const defaultBirthdayStart = new Date("1991-01-01");
  // if (!datesEqual(birthdayDates.birthdayStart.value, defaultBirthdayStart) && birthdayDates.birthdayStart.value !== undefined) {
  //   const formattedBirthdayStart = formateDate(birthdayDates.birthdayStart.value);
  //   queries.push(`birthdayStart=${formattedBirthdayStart}`);
  // }

  // if (!datesEqual(birthdayDates.birthdayEnd.value, new Date())) {
  //   const formattedBirthdayEnd = formateDate(birthdayDates.birthdayEnd.value);
  //   queries.push(`birthdayEnd=${formattedBirthdayEnd}`);
  // }

  if(limit.value !== 100) queries.push(`limit=${limit.value}`);
  queries.push(`sortMode=${sortMode.value}`);
  q.value = queries

  const queryString = queries.join('&');
  console.log('queryString ', queryString);
  

  try {
    const response = await fetch(`/api/admin/getUser?${queryString}`);
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};


</script>
 
<template>
  <div class="panel">
    <fieldset>
      <legend>Choose need category:</legend>
      <div v-for="category in categories" :key="category">
        <input 
          type="checkbox" 
          id="category" 
          name="category" 
          @change="toggleCategory(category)"  
          :checked="changedCategories.includes(category)"
        />
        <label :for="category">{{ category }}</label>
      </div>
    </fieldset>  

    <div class="panel__search">
      <UIInput
        v-model="searchUser"
        id="search"
        placeholder="Search the user"
      />
    </div>

    <div class="panel__search">
      <UIInput
        v-model="searchPhone"
        type="phone"
        id="phone"
        placeholder="Search the user by phone"
      />
    </div>

    <div class="panel__date">
      <div>
        <label for="start">Start registred date:</label>
        <VueDatePicker
          v-model="registredStart" 
          :enable-time-picker="false"
        />
      </div>
      <div>
        <label for="start">End registred date:</label>
        <VueDatePicker
          v-model="registredDates.registredEnd.value" 
          :enable-time-picker="false"
          :max-date="new Date()"
        />
      </div>
    </div>

    <div class="panel__date">
      <div>
        <label for="start">Start birthday date:</label>
        <VueDatePicker
          v-model="birthdayDates.birthdayStart.value" 
          :enable-time-picker="false"
        />
      </div>
      <div>
        <label for="start">End birthday date:</label>
        <VueDatePicker
          v-model="birthdayDates.birthdayEnd.value" 
          :enable-time-picker="false"
        />
      </div>
    </div>

    <div class="panel__select">
      <div>
        <p>Limit on the page:</p>
        <select name="limit" id="limit" v-model="limit">
          <option v-for="(value, key) in optionsLimit" :key="key" :value="value">{{ key }}</option>
        </select>
      </div>
      <div >
        <p>Sort by:</p>
        <select name="sort" id="sort" v-model="sortMode">
          <option v-for="(value, key) in optionsSort" :key="key" :value="value">{{ key }}</option>
        </select>
      </div>
    </div>
    <div class="panel__button">
      <UIButton class="btn-reset" width="145px" text="Reset" @click="reset"/>
      <UIButton width="145px" text="Search" @click="submitRequest"/>
    </div>
    <pre>{{q}}</pre>

  </div>
</template>
 
<style scoped lang='scss'>
.panel{
  padding: 10px 0;

  fieldset{
    div{
      display: flex;
      gap: 10px;
      margin: 5px 0 0;
    }
    label,input{
      display: block;
      width: 15px;
    }
  }
  &__search{
    margin-top: 20px;
    display: flex;
    align-items: center;
    gap: 20px;
    
  }
  &__date{
    margin-top: 20px;
    display: flex;
    gap: 10px;

    label{
      display: block;
      margin-bottom: 5px;
    }
    input{
      font-size: 18px;
      color: $grey-7;
      border: 1px solid $grey-5;
      padding: 7px 9px;
      border-radius: $radius-4;
    }
  }
  &__select{
    display: flex;
    gap: 20px;
    margin-top: 10px;
    p{
      margin: 7px 0;
    }
    #limit,#sort{
      width: 145px;
      height: 30px;
      border: 1px solid $grey-5;
      border-radius: $radius-3;

      text-align: center;

      &:hover{
        border: 1px solid $grey-7;
      }
    }
    #limit option {
      height: 25px;
    }
    #limit option:hover {
      background-color: #8bc34a; 
      color: #fff; 
    }
  }

  &__button{
    margin-top: 25px;
    display: flex;
    gap: 20px;
  }
}
.dp__main{
  width: 150px;
}
.dp__theme_light{
  --dp-border-color: #9898a1;
  --dp-border-color-hover: #4b4b4c;
}

</style>
