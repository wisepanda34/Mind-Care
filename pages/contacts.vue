<!-- pages/contacts.vue -->
<script setup lang='ts'>
 
</script>
 
<template>
  <div class="contacts">
    <h1 class="contacts__title">Contacts</h1>
    <p class="contacts__descr">We are happy to help you find peace and solve problems at any time convenient for you. </p>
    <p class="contacts__descr">You can contact us by phone or email.</p>
    <div class="contacts__info">
      <div class="contacts__contact">
        <a href="mailto:mind-care.help@gmail.com">mind-care.help@gmail.com</a>
        <a href="tel:+4407414563">+44 0741 45 63</a>
        <p>53 Gower St, London WC1E 6HJ, <br> United Kingdom</p>
      </div>
      
      <div class="contacts__map">
        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2482.5624018426233!2d-0.1326564!3d51.5212438!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761b2e5f652569%3A0x804321e37c4a4b1a!2s53%20Gower%20St%2C%20London%20WC1E%206HJ%2C%20UK!5e0!3m2!1sen!2sua!4v1719588330490!5m2!1sen!2sua"  height="450" style="border:0;" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>
  </div>
</template>
 
<style scoped lang='scss'>
 .contacts {

  &__title {
    font-size: 40px;
    font-weight: 600;
    color: $blue-850;
    margin-bottom: 20px;
  }
  &__descr {
    font-size: 20px;
    color: $blue-900;
    margin-bottom: 20px;
  }
  &__info {
    display: flex;

  }
  &__contact {
    width: 90%;
    margin: 0 auto;
    padding: 30px 0 0;

    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;

    text-align: center;
    font-size: 26px;
    color: $blue-850;
  }
  &__map {
    width: 100%;
    iframe {
      display: block;
      width: 100%;
      height: 500px;
      margin: 0 0 0 auto;
    }
  }
 }
 @media (max-width:900px) {
  .contacts {
    &__info {
      flex-direction: column-reverse;
    }
    &__contact {
      
    }
    &__map {
    width: 100%;
    iframe {
      display: block;
      width: 100%;
      height: calc(35vh);
      margin: 0 0 0 auto;
    }
  }
  }
 }
</style>