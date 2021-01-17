import Vue from 'vue';
import Vuex from 'vuex';
import App from '../views/Home.vue';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: null,
  },
  mutations: {
    mutateUser(state, payload) {
      state.user = payload;
    },
  },
  getters: {
    getUser(state) {
      return state.user;
    },
  },
  modules: {
    App,
  },
});

export default store;
