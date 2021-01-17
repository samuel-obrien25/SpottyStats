<template>
    <header class="Header">
      <h1 class="Header__Title">SpottyStats</h1>
      <span class="Header__Pipe">&#124;</span>
      <p class="Header__Body">Spotify Usage Stats</p>
      <div class="Header__LogInOut">
          <LogInOutButton v-bind:inOut="inOrOut"/>
      </div>
    </header>
</template>

<script>
import LogInOutButton from './Buttons/LogInOutButton.vue';

export default {
  name: 'Header',
  components: {
    LogInOutButton,
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
    .Header {
        background-color: #111111;
        color: #fff;
        display: flex;
        height: 85px;
        left: 0;
        position: absolute;
        text-align: left;
        top: 0;
        width: 100%;

        &__Body, &__Pipe, &__Title{
            margin: auto 5px;
        }

        &__Pipe{
            transform: scaleY(3);
        }

        &__Title{
            color: #fff;
            padding: 8px;
        }

        &__LogInOut{
            margin: auto;
            margin-right: 0;
        }
    }
</style>
