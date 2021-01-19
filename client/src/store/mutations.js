const SET_ACCESS_TOKEN = (state, payload) => {
  return state.access_token = payload;
};

const SET_DID_SUCCEED = (state, payload) => {
  return state.didSucceed = payload;
};

const SET_FILTERS = (state, payload) => {
  return state.filters = payload;
};

const SET_TOP_ARTISTS = (state, payload) => {
  return state.topArtists = payload;
};

const SET_TOP_SONGS = (state, payload) => {
  return state.topSongs = payload;
};

const SET_USER = (state, payload) => {
  return state.user = payload;
};

const Mutations = {
  SET_ACCESS_TOKEN,
  SET_DID_SUCCEED,
  SET_FILTERS,
  SET_TOP_ARTISTS,
  SET_TOP_SONGS,
  SET_USER,
};

export default Mutations;
