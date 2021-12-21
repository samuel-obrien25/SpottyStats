const request = require('request');
const querystring = require('querystring');

const getBaseURL = require('../utils/getBaseURL');
const getClientId = require('../utils/getClientId');
const getClientSecret = require('../utils/getClientSecret');
const getRedirectURI = require('../utils/getRedirectURI');
const {
  AUTHORIZATION_CODE,
  INVALID_TOKEN,
  STATE_KEY,
  STATE_MISMATCH,
  TOKEN_URL,
} = require('../Constants');

const callback = (req, res) => {
  // your application requests refresh and access tokens
  // after checking the state parameter
  const baseURL = getBaseURL();
  const client_id = getClientId();
  const client_secret = getClientSecret();
  const code = req.query.code || null;
  const redirect_uri = getRedirectURI();
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[STATE_KEY] : null;

  if (state === null || state !== storedState) {
    res.redirect(`/#${
      querystring.stringify({
        error: STATE_MISMATCH,
      })}`);
  } else {
    res.clearCookie(STATE_KEY);
    const authOptions = {
      url: TOKEN_URL,
      form: {
        code,
        redirect_uri,
        grant_type: AUTHORIZATION_CODE,
      },
      headers: {
        Authorization: `Basic ${new Buffer.from(
          `${client_id}:${client_secret}`,
        ).toString('base64')}`,
      },
      json: true,
    };

    request.post(authOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const { access_token } = body;
        const { refresh_token } = body;

        res.redirect(`${baseURL}?${
          querystring.stringify({
            access_token,
            refresh_token,
          })}`);
      } else {
        res.redirect(`/#${
          querystring.stringify({
            error: INVALID_TOKEN,
          })}`);
      }
    });
  }
};

module.exports = callback;
