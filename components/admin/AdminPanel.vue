<!-- components/admin/AdminPanel.vue -->
<script setup lang='ts'>

import {formatDate} from '~/utils/convertDate'
import VueDatePicker from '@vuepic/vue-datepicker';
import {useAuthStore} from '~/stores/auth.store'
import {useAdminStore} from '~/stores/admin.store'

const authStore = useAuthStore()
const adminStore = useAdminStore()
const optionsLimit = { '3': 3, '10': 10, 'all': 100 }
const optionsSort = { 'a-z': 1, 'z-a': 2, 'registered up': 3, 'registered down': 4, 'age up': 5, 'age down': 6 }
const categories = ['clients', 'doctors', 'admins']

const changedCategories = ref<String[]>(['clients'])
const searchUser = ref('')
const searchPhone = ref('')
const registredStart = ref<Date | null>(null);
const registredEnd = ref<Date | null>(null);
const birthdayStart = ref<Date | null>(null);
const birthdayEnd = ref<Date | null>(null);
const limit = ref<number>(100)
const sortMode = ref<number>(1)


const toggleCategory = (category: string) => {
  const index = changedCategories.value.indexOf(category);
  if (index === -1) changedCategories.value.push(category);
  else changedCategories.value.splice(index, 1);
};

const reset = () => {
  searchUser.value = ''
  searchPhone.value = ''
  registredStart.value = null
  registredEnd.value = null
  birthdayStart.value = null
  birthdayEnd.value = null
  limit.value = 100
  sortMode.value = 1
}

const submitRequest = async () => {
  const query: String[] = [];

  if (changedCategories.value.length === 0) {
    authStore.openMessageModal('Change users categories!')
    return
  }
  const category = changedCategories.value.join(',');
  query.push(`category=${encodeURIComponent(category)}`);

  if(searchUser.value.trim() !== '') query.push(`searchUser=${encodeURIComponent(searchUser.value.trim())}`)

  if(searchPhone.value.trim() !== '') query.push(`searchPhone=${encodeURIComponent(searchPhone.value.trim())}`);

  if (registredStart.value) query.push(`registredStart=${convertDateToString(registredStart.value)}`);
  if (registredEnd.value) query.push(`registredEnd=${convertDateToString(registredEnd.value)}`);
  if (birthdayStart.value) query.push(`birthdayStart=${convertDateToString(birthdayStart.value)}`);
  if (birthdayEnd.value) query.push(`birthdayEnd=${convertDateToString(birthdayEnd.value)}`);

  query.push(`limit=${limit.value}`);
  query.push(`sortMode=${sortMode.value}`);
  
  await adminStore.searchUsers(query);
};

</script>
 
<template>
  <div class="panel">
    <div class="panel__query">
      <fieldset class="panel__fieldset panel__block">
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

      <div class="panel__block">
        <p>Search </p>
        <div class="panel__search">
          <UIInput
            v-model="searchUser"
            id="search"
            placeholder="Search the user"
          />
        </div><br/> 
  
        <div class="panel__search">
          <UIInput
            v-model="searchPhone"
            type="phone"
            id="phone"
            placeholder="Search the user by phone"
          />
        </div>
      </div>

      <div class="panel__block">
        <div class="panel__date">
          <div>
            <label for="start">Start registred date:</label>
            <VueDatePicker
              v-model="registredStart" 
              :format="formatDate"
              :enable-time-picker="false"
            />
          </div>
          <div>
            <label for="start">End registred date:</label>
            <VueDatePicker
              v-model="registredEnd" 
              :enable-time-picker="false"
              :format="formatDate"
              :max-date="new Date()"
            />
          </div>
        </div><br>
  
        <div class="panel__date">
          <div>
            <label for="start">Start birthday date:</label>
            <VueDatePicker
              v-model="birthdayStart" 
              :enable-time-picker="false"
              :format="formatDate"
            />
          </div>
          <div>
            <label for="start">End birthday date:</label>
            <VueDatePicker
              v-model="birthdayEnd" 
              :enable-time-picker="false"
              :format="formatDate"
            />
          </div>
        </div>
      </div>

      <div></div>


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


      <div class="panel__button panel__block">
        <UIButton class="btn-reset" width="145px" text="Reset" @click="reset"/>
        <UIButton width="145px" text="Search" @click="submitRequest"/>
      </div>
    </div>

    <div class="panel__result">
      <ul v-if="adminStore.users">
        <li v-for="user in adminStore.users" :key="user.id" class="panel__result-item">
          <div><span>Name:</span>  {{ user.name }}</div>
          <div v-if="user.surname"><span>Surname:</span>  {{ user.surname }}</div>
          <div><span>Email:</span>  {{ user.email}}</div>
          <div><span>Phone:</span>  {{ user.phone}}</div>
          <div><span>Role:</span>  {{ user.role}}</div>
          <div><span>Birthday:</span>  {{ formatDate(parseShortDate(user.birthday))}}</div>
          <div><span>Registered:</span>  {{ convertDateToString(parseDate(user.registeredAt))}}</div>
          <div v-if="user.info?.education"><span>Education:</span>  {{ user.info.education}}</div>
          <div v-if="user.info?.experience"><span>Experience:</span>  {{ user.info.experience}}</div>
          <div v-if="user.info?.specialization"><span>Specialization:</span>  {{ user.info.specialization}}</div>

        </li>
      </ul>
    </div>

  </div>
</template>
 
<style scoped lang='scss'>
.panel{
  padding: 10px 0;

  &__query{
    display: grid;
    grid-template-columns: 0.5fr 1fr 1fr ;
    grid-template-rows: 180px;
  }

  &__fieldset{
    width: 200px;
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
    display: flex;
    align-items: center;
    gap: 20px;
    
  }
  &__date{
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
    p{
      margin-bottom: 7px;
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
    margin-top: 15px;
    display: flex;
    gap: 20px;
  }
  &__result{
    margin-top: 20px;
    &-item{
      padding: 15px 0;
      div{
        font-size: 18px;
        padding: 3px;
        span{
          display: inline-block;
          color: $grey-7;
          width: 120px;
        }
      }
    }
  }
}
.dp__main{
  width: 150px;
}
.dp__theme_light{
  --dp-border-color: #9898a1;
  --dp-border-color-hover: #4b4b4c;
}

@media (max-width: 900px) {
  .panel{
    &__query{
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
  }
}

</style>
