<!-- pages/reviews.vue -->
<script setup lang='ts'>

const response = await fetch('/api/review')
const reviews = await response.json();
 
</script>
 
<template>
  <div class="reviews">
    <h1 class="reviews__title text-center text--fz30 text--fw700">Reviews</h1>
    <div class="reviews__card" v-for="review in reviews" :key="review._id">
      <h5>{{ review.name }}</h5>
      <p>{{ review.text }}</p>
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
  }
  h5{
    font-size: 20px;
    margin-bottom: 15px;
  }
  p{
    line-height: 1.5;
  }
 }
</style>