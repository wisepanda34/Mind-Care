<!-- components/admin/AdminPanel.vue -->
<script setup lang='ts'>

const optionsLimit = { '10': 10, '20': 20, 'all': 100 }
const optionsSort = { 'a-z': 1, 'z-a': 2, 'registered up': 3, 'registered down': 4, 'age up': 5, 'age down': 6 }
const categories = ['clients', 'doctors', 'admins']


const changedCategories = ref<String[]>(['clients'])
const searchUser = ref('')
const searchPhone = ref('')
const registredDates = {
  registredStart: ref(new Date("2022-01-01")),
  registredEnd: ref(new Date())
}
const birthdayDates = {
  birthdayStart: ref(new Date("1991-01-01")),
  birthdayEnd: ref(new Date("2020-12-31"))
}
const limit = ref<number>(10)
const sortMode = ref<number>(1)


const toggleCategory = (category: string) => {
  const index = changedCategories.value.indexOf(category);
  if (index === -1) changedCategories.value.push(category);
  else changedCategories.value.splice(index, 1);
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
        <input 
          v-model="registredDates.registredStart.value" 
          type="date" 
          id="registred-start" 
          name="registred-start" 
          min="2022-01-01" 
          max="2030-12-31" 
          lang="en"
        />
      </div>
      <div>
        <label for="start">End registred date:</label>
        <input 
          v-model="registredDates.registredEnd.value" 
          type="date" 
          id="registred-end" 
          name="registred-end" 
          min="2022-01-01" 
          max="2030-12-31" 
          lang="en"
        />
      </div>
    </div>

    <div class="panel__date">
      <div>
        <label for="start">Start birthday date:</label>
        <input 
          v-model="birthdayDates.birthdayStart.value" 
          type="date" 
          id="birthday-start" 
          name="birthday-start" 
          min="1900-01-01" 
          max="2030-12-31" 
          lang="en"
        />
      </div>
      <div>
        <label for="start">End birthday date:</label>
        <input
          v-model="birthdayDates.birthdayEnd.value" 
          type="date" 
          id="birthday-end" 
          name="birthday-end" 
          min="1900-01-01" 
          max="2030-12-31" 
          lang="en"
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
      <UIButton class="btn-reset" width="145px" text="Reset"/>
      <UIButton width="145px" text="Search"/>
    </div>

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
    input[type="checkbox"]:checked {
      background: #04c5ab;
      border-color: #007bff; 
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
    gap: 20px;

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

</style>
