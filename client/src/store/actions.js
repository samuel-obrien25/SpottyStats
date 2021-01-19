import Vue from 'vue';
import Types from './types';

const { getters } = Types;

const UPDATE_FILTERS = ({ commit }, payload) => {
  commit(getters.SET_FILTERS, payload);
};

const UPDATE_TOP_ARTISTS = ({ commit }, payload) => {
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
    commit(getters.SET_TOP_ARTISTS, response);
  });
};

const UPDATE_TOP_SONGS = ({ commit }, payload) => {
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
    commit(getters.SET_TOP_SONGS, response);
  });
};

const UPDATE_USER = ({ commit }) => {
  Vue.axios.get('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: `Bearer ${this.state.access_token}`,
    },
  }).then((response) => {
    commit(getters.SET_USER, response.data);
    commit(getters.SET_DID_SUCCEED, true);
  }).catch((error) => {
    console.log('SET_USER failed with error ', error);
    commit(getters.SET_DID_SUCCEED, false);
  });
};

const Actions = {
  UPDATE_FILTERS,
  UPDATE_TOP_ARTISTS,
  UPDATE_TOP_SONGS,
  UPDATE_USER,
};

export default Actions;
