<!-- components/Company.vue -->
<script setup lang='ts'>
import { useAuthStore } from '~/stores/auth.store';
const authStore = useAuthStore() 

</script>
 
<template>
  <section class="company" >
    <h1 class="title-h1">Сlinic MIND CARE offers</h1>
    <h2 class="title mt--40">Your Path to Better Mental Health</h2>
    <p>At Mind Care, we understand that mental health is just as important as physical health. We offer a variety of counseling services to help you address common mental health concerns and improve your overall well-being.</p>
    
    <div class="company__image flex-center">
      <NuxtImg class="co" src="images/doctor3.jpeg"/>
    </div>

    <h2 class="title mt--40">Our Services</h2>
    <p>We offer individual, couples, and family counseling for a variety of mental health concerns, including:</p>
    <ul>
      <li>Anxiety</li>
      <li>Depression</li>
      <li>Stress</li>
      <li>Trauma</li>
      <li>Grief and loss</li>
      <li>Relationship problems</li>
      <li>Eating disorders</li>
      <li>Substance abuse</li>
      <li>Life transitions</li>
    </ul>


    <h2 class="title mt--40">Our Therapists</h2>
    <p>Our team of experienced therapists are committed to providing you with the highest quality of care. They are all licensed and insured, and they have a wealth of experience working with people from all walks of life.</p> 
    
    <div class="company__image flex-center">
      <NuxtImg src="images/consultation2.webp"/>
    </div>

    <h2 class="title mt--40">Our Approach</h2>
    <p>We believe that everyone is unique, and we tailor our approach to meet your individual needs. We use a variety of evidence-based therapies, including cognitive-behavioral therapy (CBT), psychodynamic therapy, and mindfulness-based therapy.</p>
  
    <h2 class="title mt--40">What to Expect</h2>
    <p>When you first come to Mind Care, we will meet with you to assess your needs and develop a treatment plan. We will work with you at your own pace, and we will be there to support you every step of the way.</p>
  
    <div class="company__image flex-center">
      <NuxtImg src="images/doctor1.jpeg"/>
    </div>

    <h2 class="title mt--40">Contact Us</h2>
    <p>If you are ready to take the next step on your journey to better mental health, please contact us today. We offer a free consultation so that you can meet with one of our therapists and learn more about our services.</p> 

    <h2 class="title mt--40">Why Choose Mind Care?</h2>
    <ul>
      <li>We offer a variety of counseling services to address a wide range of mental health concerns.</li>
      <li>Our team of experienced therapists are committed to providing you with the highest quality of care.</li>
      <li>We tailor our approach to meet your individual needs.</li>
      <li>We offer a free consultation so that you can meet with one of our therapists and learn more about our services.</li>
    </ul>

    <div class="company__image flex-center">
      <NuxtImg src="images/doctor2.jpeg"/>
    </div>

    <h2 class="title mt--40">Take the First Step to Better Mental Health</h2>
    <p>If you are struggling with a mental health concern, please don't hesitate to reach out for help. Contact Mind Care today to schedule a free consultation.</p>
  </section>
</template>
 
<style scoped lang='scss'>
.company{
  
  h2 {
    color: $blue-900;
  }
  p{
    text-indent: 40px;
    line-height: 1.75rem;
    margin-top: 10px;
    color: $blue-900;
  }
  ul{
    margin-top: 10px;
    line-height: 1.5rem;
    margin-bottom: 20px;
    padding-left: 100px;
    color: $blue-800;
  }
  li {
    position: relative;
  }
  li::before {
    content: url(/public/svg/check.svg);
    position: absolute;
    top: 3px;
    left: -30px;
    width: 15px;
    height: 15px;
    opacity: 0.8;
  }
  &__image{
    padding: 20px 10% 0;

    img{
      width: 100%;
      box-shadow: $shadow-5;
    }
  }
}
@media (max-width: 900px) {
  .company{
    &__title {
      font-size: 30px;
    }
    &__image{
      padding: 20px 0;
    }
  }
}
</style>