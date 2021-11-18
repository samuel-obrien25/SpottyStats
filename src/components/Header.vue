<template>
  <header class="Header">
    <h1 class="Header__Title">
      SpottyStats
    </h1>
    <span class="Header__Pipe">&#124;</span>
    <p class="Header__Body">
      Spotify Usage Stats
    </p>
    <div class="Header__LogInOut">
      <LogInOutButton :in-out="inOrOut" />
    </div>
  </header>
</template>

<script>
import LogInOutButton from './Buttons/LogInOutButton.vue';

export default {
  name: 'AppHeader',
  components: {
    LogInOutButton,
  },
  props: {
    isSplash: Boolean,
  },
  computed: {
    inOrOut() {
      return this.user ? 'out' : 'in';
    },
    user() {
      return this.$store.getters.getUser;
    },
  },
};
</script>

<style lang="scss" scoped>
  /* Portrait */
  @media only screen and (min-device-width: 375px){
    .Header {
      background-color: #111111;
      color: #fff;
      display: flex;
      flex-direction: column;
      height: 50px;
      left: 0;
      position: fixed;
      top: 0;
      width: 100%;
      z-index: 1;

      &__Body, &__Pipe, &__Title{
        color: #fff;
        margin: auto;
      }

      &__Pipe, &__Body{
        display: none;
      }

      &__Title{
        padding: 8px;
      }

      &__LogInOut{
        margin: 0;
        position: fixed;
        bottom: 10px;
        right: 0px;
      }
    }
  }

  /* Desktop */
  @media only screen and (min-device-width: 813px){
    .Header {
      flex-direction: row;
      height: 85px;
      text-align: left;
      width: 100%;

        &__Body, &__Pipe, &__Title{
          margin: auto 5px;
        }

        &__Pipe, &__Body{
          display: block;
        }

        &__Pipe{
            transform: scaleY(3);
        }

        &__Title{
            padding: 8px;
        }

        &__LogInOut{
          bottom: auto;
          margin: auto;
          margin-right: 10px;
          position: relative;
        }
    }
  }
</style>
