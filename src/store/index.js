import Vue from 'vue';
import Vuex from 'vuex';
import App from '../views/Home.vue';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    access_token: localStorage.getItem('access_token') || '',
    didSucceed: null,
    tableFilters: {
      artists: {
        showGenres: 'checked',
        showPopularity: 'checked',
      },
      songs: {
        showAlbumTitle: 'checked',
        showDuration: 'checked',
        showPopularity: 'checked',
        showReleaseDate: 'checked',
      },
    },
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
    mutateTableFilters(state, payload) {
      state.tableFilters = payload;
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
    setTableFilters({ commit }, payload) {
      commit('mutateTableFilters', payload);
    },
    setTopSongs({ commit }, payload) {
      const baseURL = 'https://api.spotify.com/v1/me/top/tracks?';
      const timeRangeQueryParam = payload.timeRange ? `&time_range=${payload.timeRange.toString()}` : null;
      const limitQueryParam = payload.limit ? `&limit=${payload.limit.toString()}` : null;
      let reqURL = baseURL;

      if (timeRangeQueryParam) {
        reqURL += timeRangeQueryParam;
      }

      if (limitQueryParam) {
        reqURL += limitQueryParam;
      }

      Vue.axios.get(reqURL, {
        headers: {
          Authorization: `Bearer ${this.state.access_token}`,
        },
      }).then((response) => {
        commit('mutateTopSongs', response);
      });
    },
    setTopArtists({ commit }, payload) {
      const baseURL = 'https://api.spotify.com/v1/me/top/artists?';
      const timeRangeQueryParam = payload.timeRange ? `&time_range=${payload.timeRange.toString()}` : null;
      const limitQueryParam = payload.limit ? `&limit=${payload.limit.toString()}` : null;
      let reqURL = baseURL;

      if (timeRangeQueryParam) {
        reqURL += timeRangeQueryParam;
      }

      if (limitQueryParam) {
        reqURL += limitQueryParam;
      }

      Vue.axios.get(reqURL, {
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
    getFiltersArtists(state) {
      return state.tableFilters.artists;
    },
    getFiltersSongs(state) {
      return state.tableFilters.songs;
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
