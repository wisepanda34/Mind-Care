<!-- components/Company.vue -->
<script setup lang='ts'>
 
</script>
 
<template>
  <section class="company" >
    <h1 class="text-center text--fz30 text--fw700">Mind Care</h1>
    <h2>Your Path to Better Mental Health</h2>
    <p>At Mind Care, we understand that mental health is just as important as physical health. We offer a variety of counseling services to help you address common mental health concerns and improve your overall well-being.</p>
    
    <div class="company__image flex-center">
      <NuxtImg class="co" src="images/doctor3.jpg"/>
    </div>

    <h2>Our Services</h2>
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


    <h2>Our Therapists</h2>
    <p>Our team of experienced therapists are committed to providing you with the highest quality of care. They are all licensed and insured, and they have a wealth of experience working with people from all walks of life.</p> 
    
    <div class="company__image flex-center">
      <NuxtImg src="images/consultation2.webp"/>
    </div>

    <h2>Our Approach</h2>
    <p>We believe that everyone is unique, and we tailor our approach to meet your individual needs. We use a variety of evidence-based therapies, including cognitive-behavioral therapy (CBT), psychodynamic therapy, and mindfulness-based therapy.</p>
  
    <h2>What to Expect</h2>
    <p>When you first come to Mind Care, we will meet with you to assess your needs and develop a treatment plan. We will work with you at your own pace, and we will be there to support you every step of the way.</p>
  
    <div class="company__image flex-center">
      <NuxtImg src="images/doctor1.jpg"/>
    </div>

    <h2>Contact Us</h2>
    <p>If you are ready to take the next step on your journey to better mental health, please contact us today. We offer a free consultation so that you can meet with one of our therapists and learn more about our services.</p> 

    <h2>Why Choose Mind Care?</h2>
    <ul>
      <li>We offer a variety of counseling services to address a wide range of mental health concerns.</li>
      <li>Our team of experienced therapists are committed to providing you with the highest quality of care.</li>
      <li>We tailor our approach to meet your individual needs.</li>
      <li>We offer a free consultation so that you can meet with one of our therapists and learn more about our services.</li>
    </ul>

    <div class="company__image flex-center">
      <NuxtImg src="images/doctor2.jpg"/>
    </div>

    <h2>Take the First Step to Better Mental Health</h2>
    <p>If you are struggling with a mental health concern, please don't hesitate to reach out for help. Contact Mind Care today to schedule a free consultation.</p>
  </section>
</template>
 
<style scoped lang='scss'>
.company{
  color: $black;
  h1{
    margin: 10px 0;
  }
  h2{
    font-size: 22px;
    font-weight: 600;
    margin-top: 30px;
  }
  p{
    text-indent: 40px;
    line-height: 1.75rem;
    margin-top: 10px;
  }
  ul{
    margin-top: 10px;
    line-height: 1.75rem;
    margin-bottom: 20px;
    padding-left: 40px;
  }
  &__image{
    padding: 20px 10% 0;

    img{
      width: 100%;
      box-shadow: $shadow-5;
    }
  }
}
</style>