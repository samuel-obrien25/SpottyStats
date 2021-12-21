const generateRandomString = require('../utils/generateRandomString');
const getClientId = require('../utils/getClientId');
const getRedirectURI = require('../utils/getRedirectURI');
const { STATE_KEY } = require('../Constants');

const login = (req, res) => {
  const client_id = getClientId();
  const redirect_uri = getRedirectURI();
  const scope = 'user-read-private user-read-email user-top-read';
  const state = generateRandomString(16);

  const queryStringObj = {
    response_type: 'code',
    client_id,
    scope,
    redirect_uri,
    state,
  };

  const qs = new URLSearchParams(queryStringObj).toString();

  res.cookie(STATE_KEY, state);
  res.redirect(`https://accounts.spotify.com/authorize?${qs}`);
};

module.exports = login;
