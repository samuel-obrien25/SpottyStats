const APPLICATION_SCOPE = 'user-read-private user-read-email user-top-read';
const AUTHORIZATION_CODE = 'authorization_code';
const AUTHORIZE_URL = 'https://accounts.spotify.com/authorize?';
const INVALID_TOKEN = 'invalid_token';
const STATE_KEY = 'spotify_auth_state';
const STATE_MISMATCH = 'state_mismatch';
const TOKEN_URL = 'https://accounts.spotify.com/api/token';

module.exports = {
  APPLICATION_SCOPE,
  AUTHORIZATION_CODE,
  AUTHORIZE_URL,
  INVALID_TOKEN,
  STATE_KEY,
  STATE_MISMATCH,
  TOKEN_URL,
};
