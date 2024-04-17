<!-- components/UI/StarRating.vue -->
<script setup lang="ts">

const props = defineProps({rating: Number, maxStars: { type: Number, default: 5 }, enabled: Boolean });
const emits = defineEmits(['update:rating'])


const setRating = (value: number) => {
  if (props.enabled) {
    emits('update:rating', value);
  }
}

</script>

<template>
  <div class="rating">
    <template v-for="star in maxStars">
      <svg 
        class="rating__icon" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 576 512"
        @click="enabled ? setRating(star) : null"
      >
        <path class="rating__yellow" v-if="props.rating && star <= props.rating" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
        <path class="rating__transporent" v-else d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
      </svg>
    </template>
  </div>
</template>



<style scoped lang="scss">
.rating {
  display: flex;
  gap: 4px;

  &__icon {
    width: 20px;
    height: 20px;
  }
  &__yellow{
      stroke-width: 2px;
      stroke: yellow; 
      fill: rgb(249, 228, 1); 
    }
  &__transporent{
    stroke-width: 3px;
    stroke:rgb(0, 0, 0); 
    fill: rgb(251, 247, 210); 
  }
}
</style>
