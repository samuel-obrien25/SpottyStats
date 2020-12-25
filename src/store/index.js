import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isAuthorized: false,
  },
  mutations: {
    togglAuth(state) {
      state.isAuthorized = !state.isAuthorized;
    },
  },
});

export default store;
