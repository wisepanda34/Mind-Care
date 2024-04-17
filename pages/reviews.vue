<!-- pages/reviews.vue -->
<script setup lang='ts'>

const response = await fetch('/api/review')
const reviews = await response.json();
 
</script>
 
<template>
  <div class="reviews">
    <h1 class="reviews__title text-center text--fz30 text--fw700">Reviews</h1>
    <ul>
       <li class="reviews__card" v-for="review in reviews" :key="review._id">
        <div class="reviews__header">
          <h5>{{ review.name }}</h5>
          <div class="reviews__stars">
            <template v-for="n in 5">
              <svg class="reviews__stars-yellow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" v-if="n <= review.stars">
                <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
              </svg>
              <svg class="reviews__stars-transporent" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" v-else>
                <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
              </svg>
            </template>
          </div>
        </div>
        <p>{{ review.text }}</p>
      </li>
    </ul>

    <div class="reviews__write">
      <form>

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
  &__stars{
    display: flex;
    &-yellow{
      width: 20px;
      height: 20px;
      stroke: yellow; 
      fill: rgb(249, 228, 1); 
    }
    &-transporent{
      width: 20px;
      height: 20px;
      stroke-width: 1px;
      stroke:rgb(140, 128, 1); 
      fill: rgb(251, 247, 210); 
    }
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