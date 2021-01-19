const GET_ACCESS_TOKEN = (state) => state.access_token;
const GET_DID_SUCCEED = (state) => state.didSucceed;
const GET_FILTERS = (state) => state.filters;
const GET_FILTERS_ARTISTS = (state) => state.filters.artists;
const GET_FILTERS_SONGS = (state) => state.filters.songs;
const GET_TOP_ARTISTS = (state) => state.topArtists;
const GET_TOP_SONGS = (state) => state.topSongs;
const GET_USER = (state) => state.user;

const Getters = {
  GET_ACCESS_TOKEN,
  GET_DID_SUCCEED,
  GET_FILTERS,
  GET_FILTERS_ARTISTS,
  GET_FILTERS_SONGS,
  GET_TOP_ARTISTS,
  GET_TOP_SONGS,
  GET_USER,
};

export default Getters;
