<template>
  <div class="LogInOut__Wrapper">
    <router-link
      v-if="inOut === 'in'"
      to="/api/login"
    >
      <span
        class="ActionButton ActionButton--Constructive"
      >
        Log In
      </span>
    </router-link>
    <router-link v-else>
      <span
        class="ActionButton ActionButton--Destructive"
        href="/api/logout"
      >
        Log Out
      </span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'LogInOutButton',
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

  .ActionButton{
    border-radius: 7.5px;
    font-weight: 700;
    margin: auto;
    padding: 15px 20px;
    font-weight: 700;

    &--Constructive{
        background-color: #6dcac1;
        border: 3px solid rgba(0,0,0,.85);
        box-shadow: -3px 3px 0px 1px #449a92;
        color: rgba(0,0,0,.85);
    }
    &--Destructive{
        background-color: #fdb1be;
        border: 3px solid rgba(0,0,0,.85);
        box-shadow: -3px 3px 0px 1px #c77281;
        color: rgba(0,0,0,.85);
    }
}
}
</style>
