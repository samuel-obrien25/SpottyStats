// Mutations
const Types = {

  actions: {
    UPDATE_FILTERS: 'UPDATE_FILTERS',
    UPDATE_TOP_ARTISTS: 'UPDATE_TOP_ARTISTS',
    UPDATE_TOP_SONGS: 'UPDATE_TOP_SONGS',
    UPDATE_USER: 'UPDATE_USER',
  },

  getters: {
    GET_ACCESS_TOKEN:    'GET_ACCESS_TOKEN',
    GET_DID_SUCCEED:     'GET_DID_SUCCEED',
    GET_FILTERS:         'GET_FILTERS',
    GET_FILTERS_ARTISTS: 'GET_FILTERS_ARTISTS',
    GET_FILTERS_SONGS:   'GET_FILTERS_SONGS',
    GET_TOP_ARTISTS:     'GET_TOP_ARTISTS',
    GET_TOP_SONGS:       'GET_TOP_SONGS',
    GET_USER:            'GET_USER',
  },

  mutations: {
    SET_ACCESS_TOKEN:  'SET_ACCESS_TOKEN',
    SET_DID_SUCCEED:   'SET_DID_SUCCEED',
    SET_FILTERS:       'SET_FILTERS',
    SET_TOP_ARTISTS:   'SET_TOP_ARTISTS',
    SET_TOP_SONGS:     'SET_TOP_SONGS',
    SET_USER:          'SET_USER',
  },

  state: {
    access_token: 'access_token',
    didSucceed: 'didSucceed',
    filters: {
      artists: {
        showGenres: 'showGenres',
        showPopularity: 'showPopularity',
      },
      songs: {
        showAlbumTitle: 'showAlbumTitle',
        showDuration: 'showDuration',
        showPopularity: 'showPopularity',
        showReleaseDate: 'showReleaseDate',
      },
    },
    topArtists: 'topArtists',
    topSongs: 'topSongs',
    user: 'user',
  },
};

export default Types;
