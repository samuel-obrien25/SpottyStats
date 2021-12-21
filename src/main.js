import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Home from './pages/Home.vue';
import store from './store';
import router from './router';

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(Home),
}).$mount('#app');
