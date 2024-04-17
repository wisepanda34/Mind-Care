<!-- pages/reviews.vue -->
<script setup lang='ts'>

const response = await fetch('/api/review')
const reviews = await response.json();

const textReview = ref('')
const rating = ref<number>(0)

const updateRating = (value: number) => {
  rating.value = value;
}

</script>
 
<template>
  <div class="reviews">
    <h1 class="reviews__title text-center text--fz30 text--fw700">Reviews</h1>
    <ul>
       <li class="reviews__card" v-for="review in reviews" :key="review._id">
        <div class="reviews__header">
          <h5>{{ review.name }}</h5>
          <UIStarRating :rating="review.stars" :enabled="false"  />
        </div>
        <p>{{ review.text }}</p>
      </li>
    </ul>

    <div class="reviews__write">
      <h3 class="reviews__title text-center text--fz24 text--grey-5">Write your review</h3>
      <form class="reviews__form">
        <div class="reviews__rating">
          <UIStarRating :rating="rating" :enabled="true" @update:rating="updateRating" />
        </div>
        <UITextArea  
          v-model="textReview"
          id="textReview"
          placeholder="Field for your review"
        />
      </form>
    </div>

  </div>
</template>
 


<style scoped lang='scss'>
 .reviews{
  &__title{
    margin-bottom: 30px;
  }
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
  &__form{

  }
 }
</style>