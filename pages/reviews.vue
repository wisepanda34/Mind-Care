<!-- pages/reviews.vue -->
<script setup lang='ts'>
import { useAuthStore } from '~/stores/auth.store';
import { MindRequestOptions } from '~/types/auth.type';
import { IReview } from '~/types/auth.type';
import { VueSpinnerIos} from 'vue3-spinners';


const authStore = useAuthStore()
const textReview = ref('')
const rating = ref<number>(0)
const reviews = ref<IReview[]>([])
const isLoading = ref(false)

const getReviews = async() => {
  isLoading.value = true
  const response = await fetch('/api/reviews/review')
  reviews.value = await response.json();
  isLoading.value = false
}

const updateRating = (value: number) => {
  rating.value = value;
}

const createReview = async() => {
  if(!authStore.isAuthed ){
    authStore.toggleAuthModal()
    return
  }
  if(textReview.value.length < 2) return
  
  const data = {
    id: authStore.user.id,
    text: textReview.value,
    rating: rating.value
  }
  
  const requestOptions: MindRequestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };
  
  try {
    const response = await fetch('/api/reviews/create-review', requestOptions);
    if(!response.ok){
      throw new Error('error')
    }
    const responseJson = await response.json()
    authStore.openMessageModal(responseJson.body.message)
    rating.value = 0
    textReview.value = ''
    getReviews()

  } catch(error) {
    console.log('createReview error: ', error);
  }
}

const formatDate = (dateString: string | Date) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

onMounted(()=>{
  getReviews()
})
</script>
 
<template>
  <div>
    <div v-if="isLoading" class="loading" >
      <VueSpinnerIos
        color="#76dee2"
        size="120"
      />
    </div>
   
    <div v-else class="reviews">
      <h1 class="title-h1">Reviews</h1>
      <ul>
         <li class="reviews__card" v-for="review in reviews" :key="review.userId">
          <div class="reviews__header">
            <h5>{{ review.name }}</h5>
            <div v-if="review.dateReview">{{formatDate(review.dateReview)}}</div>
            <UIStarRating :rating="review.rating" :enabled="false" />
          </div>
          <p>{{ review.text }}</p>
        </li>
      </ul>
  
      <div class="reviews__write">
        <h3 class="reviews__title text-center text--fz24 text--grey-5">Write your review</h3>
        <form class="reviews__form" @submit.prevent="createReview">
          <div class="reviews__rating">
            <UIStarRating :rating="rating" :enabled="true" @update:rating="updateRating" />
          </div>
          <UITextArea  
            v-model="textReview"
            id="textReview"
            placeholder="Field for your review"
          />
          <UIButton
            class="reviews__submit"
            type="submit"
            width="100px"
            text="OK"
          />
        </form>
      </div>
  
    </div>
  </div>
</template>
 


<style scoped lang='scss'>

 .reviews{
  &__card{
    border: 1px solid $grey-2;
    border-radius: $radius-12;
    padding: 20px;
    margin: 20px 0;
  }
  &__header{
    display: flex;
    justify-content: space-between;
  }
  h5{
    font-size: 20px;
    margin-bottom: 15px;
  }
  p{
    line-height: 1.5;
  }
  &__write{
    max-width: 600px;
    margin: 60px auto;
  }
  &__rating{
    width: 100%;
    height: 50px;
    margin: 20px auto;
    border: 1px solid $grey-2;
    border-radius: $radius-4;

    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__submit{
    margin: 30px 0 30px auto;
  }
 }
</style>