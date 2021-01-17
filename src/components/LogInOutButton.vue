<template>
  <div class="LogInOut__Wrapper">
    <a v-if="inOut === 'in'" href='http://localhost:8888/login'>Log In</a>
    <a v-else href='http://localhost:8888/logout'>Log Out</a>
  </div>
</template>

<script>
export default {
  name: 'LogInOutButton',
  props: {
    inOut: String,
  },
  methods: {
    displayBtn() {
      if (this.inOut === 'in') {
        return (<a href='http://localhost:8888/login'>Log In</a>);
      }

      if (this.inOut === 'out') {
        return (<a href='http://localhost:8888/logout'>Log Out</a>);
      }

      return null;
    },
  },
};
</script>

<style scoped>
.LogInOut__Wrapper{
  display: flex;
  height: 100%;
  margin: auto;
  margin-right: 8px;
}

a {
  background-color: #6dcac1;
    border-radius: 7.5px;
    color: rgba(0,0,0,.85);
    margin: auto;
    border: 3px solid rgba(0,0,0,.85);
    padding: 15px 20px;
    font-weight: 700;
    box-shadow: -3px 3px 0px 1px #449a92;
}
</style>
