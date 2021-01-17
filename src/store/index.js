import Vue from 'vue';
import Vuex from 'vuex';
import App from '../views/Home.vue';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    access_token: localStorage.getItem('access_token') || '',
    didSucceed: null,
    topArtists: null,
    topSongs: null,
    user: null,
  },
  mutations: {
    mutateAccessToken(state, payload) {
      state.access_token = payload;
    },
    mutateDidSucceed(state, payload) {
      state.didSucceed = payload;
    },
    mutateTopArtists(state, payload) {
      state.topArtists = payload;
    },
    mutateTopSongs(state, payload) {
      state.topSongs = payload;
    },
    mutateUser(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    setTopSongs({ commit }) {
      Vue.axios.get('https://api.spotify.com/v1/me/top/tracks', {
        headers: {
          Authorization: `Bearer ${this.state.access_token}`,
        },
      }).then((response) => {
        commit('mutateTopSongs', response);
      });
    },
    setTopArtists({ commit }) {
      Vue.axios.get('https://api.spotify.com/v1/me/top/artists', {
        headers: {
          Authorization: `Bearer ${this.state.access_token}`,
        },
      }).then((response) => {
        commit('mutateTopArtists', response);
      });
    },
    setUser({ commit }) {
      Vue.axios.get('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${this.state.access_token}`,
        },
      }).then((response) => {
        commit('mutateUser', response.data);
        commit('mutateDidSucceed', true);
      });
    },
  },
  getters: {
    getAccessToken(state) {
      return state.access_token;
    },
    getDidSucceed(state) {
      return state.didSucceed;
    },
    getTopArtists(state) {
      return state.topArtists;
    },
    getTopSongs(state) {
      return state.topSongs;
    },
    getUser(state) {
      return state.user;
    },
  },
  modules: {
    App,
  },
});

export default store;
