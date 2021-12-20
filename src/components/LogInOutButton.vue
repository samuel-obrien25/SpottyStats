<template>
  <div class="LogInOut__Wrapper">
    <SSButton
      v-if="inOut === 'in'"
      to="/api/login"
      type="Constructive"
    >
      Log in
    </SSButton>
    <SSButton
      v-else
      to="/api/logout"
      type="Destructive"
    >
      Log out
    </SSButton>
  </div>
</template>

<script>
import SSButton from './SSButton.vue';

export default {
  name: 'LogInOutButton',
  components: {
    SSButton,
  },
  props: {
    inOut: {
      type: String,
      default() {
        return 'in';
      },
    },
  },
};
</script>

<style lang="scss">
.LogInOut__Wrapper{
  display: flex;
  height: 100%;
  margin: auto;
  margin-right: 8px;
}
</style>
