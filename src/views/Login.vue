<template>
  <div class="LoginView">
    <p>
      Welcome to SpottyStats! Log in to
      see various Spotify API data for your account.
    </p>
    <LogInOutButton :in-out="'in'" />
  </div>
</template>

<script>
import LogInOutButton from '../components/Buttons/LogInOutButton.vue';

export default {
  name: 'Login',
  components: {
    LogInOutButton,
  },
};
</script>

<style lang="scss">

/* Portrait */
@media only screen and (min-device-width: 375px){
  .LoginView{
    padding: 50px 0px;
    text-align: left;

    a{
      display: none;
    }

  }

}

/* Desktop */
@media only screen and (min-device-width: 813px){
  .LoginView{
    margin: auto;

    .LogInOut__Wrapper{
      a{
        padding: 20px 40px;
      }
    }

  }
}
</style>
