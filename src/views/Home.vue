<template>
  <div id="app">
    <header class="header">
      <h1>SpottyStats</h1>
      <p>Get the Spotify usage stats you DESERVE</p>
    </header>
    <div v-if="isAuthorized">
      <Main/>
    </div>
    <div v-else>
      <LoginButton />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import LoginButton from '../components/LoginButton.vue';
import Main from '../components/Main.vue';

export default {
  name: 'App',
  components: {
    Main,
    LoginButton,
  },
  computed: mapState(['isAuthorized']),
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.header{
  margin-bottom: 50px;
}
</style>
