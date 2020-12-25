<template>
  <div>
    <h1>Welcome, {{ userName }}!</h1>
    <p>
      Get the spotify usage stats you DESERVE
    </p>
    <h2>Stats</h2>
  </div>
</template>

<script>
export default {
  name: 'Main',
  props: {
    userName: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
  margin: 40px 0 0;
}
a {
  color: #42b983;
}
</style>
