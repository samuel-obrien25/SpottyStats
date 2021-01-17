<template>
    <div class="LoginView">
      <LogInOutButton v-bind:inOut="'in'"/>
    </div>
</template>

<script>
import LogInOutButton from '../components/LogInOutButton.vue';

export default {
  name: 'Login',
  components: {
    LogInOutButton,
  },
};
</script>

<style lang="scss">
  .LoginView{
    margin: auto;

    .LogInOut__Wrapper{
      a{
        padding: 20px 40px;
      }
    }
  }
</style>
