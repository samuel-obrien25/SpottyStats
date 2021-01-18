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
  props: {
    isSplash: Boolean,
  },
};
</script>

<style lang="scss">
html, body{
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

/* Portrait */
@media only screen and (min-device-width: 375px){
  #app{
    background-image: url('../assets/background.svg');
    background-size: cover;
    color: #2c3e50;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    height: 100%;
    overflow: hidden;
    text-align: center;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
  }

  main{
    width: 100%;
    height: calc(100% - 50px);
    margin-top: 50px;

    .ContentWrapper{
      backdrop-filter: blur(5px);
      background-color: rgba(255,255,255,.8);
      border: 10px solid rgba(0,0,0,.8);
      border-radius: 8px;
      box-sizing: border-box;
      display: inline-flex;
      margin: auto;
      margin-top: 10px;
      height: calc(100% - 80px);
      overflow-x: hidden;
      overflow-y: scroll;
      padding: 20px;
      width: 96%;
    }

  }
}

/* Desktop */
@media only screen and (min-device-width: 813px){
  #app {
    overflow: auto;
  }

  main{
    margin-top: 85px;
    height: auto;

    .ContentWrapper{
      border: 15px solid rgba(0,0,0,.75);
      box-sizing: content-box;
      margin: 50px auto;
      min-height: 500px;
      width: 80%;
    }
  }
}
</style>
