<template>
  <div id="app" class="Template__Default">
    <Header/>
    <main>
      <div class='ContentWrapper'>
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script>
import Header from '../components/Header.vue';

export default {
  name: 'DefaultPage',
  components: {
    Header,
  },
};
</script>

<style lang="scss">
html, body{
  margin: 0;
  padding: 0;
}

#app {
  background-image: url('../assets/background.svg');
  background-size: cover;
  color: #2c3e50;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  margin-top: 60px;
  min-height: 100vh;
  text-align: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

main{
  margin-top:85px;
  height: 100%;
  width: 100%;

  .ContentWrapper{
    backdrop-filter: blur(5px);
    background-color: rgba(255,255,255,.8);
    border: 15px solid rgba(0,0,0,.75);
    border-radius: 8px;
    display: inline-flex;
    margin: auto;
    margin-top: 50px;
    min-height: 500px;
    padding: 20px;
    width: 80%;
  }
}
</style>
