import Vue from 'vue';
import Vuex from 'vuex';
import App from '../views/Home.vue';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    access_token: localStorage.getItem('access_token') || '',
    didSucceed: null,
    filters: {
      artists: {
        showGenres: true,
        showPopularity: true,
      },
      songs: {
        showAlbumTitle: true,
        showDuration: true,
        showPopularity: true,
        showReleaseDate: true,
      },
    },
    topArtists: null,
    topSongs: null,
    user: null,
  },
  actions,
  getters,
  mutations,
  modules: {
    App,
  },
});

export default store;
