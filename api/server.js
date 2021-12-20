const express = require('express');
const request = require('request');
const cors = require('cors');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const client_id = process.env.VUE_APP_CLIENT_ID || process.env.CLIENT_ID;
const client_secret = process.env.VUE_APP_CLIENT_SECRET || process.env.CLIENT_SECRET;
let baseURL;
let redirect_uri;

(function () {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'DEVELOPMENT') {
    baseURL = 'http://localhost:8080/';
    redirect_uri = 'http://localhost:8888/api/callback/';
  }

  if (process.env.NODE_ENV === 'STAGING') {
    baseURL = 'https://spottystats-dev.herokuapp.com/';
    redirect_uri = 'https://spottystats-dev.herokuapp.com/api/callback/';
  }

  if (process.env.NODE_ENV === 'PRODUCTION') {
    baseURL = 'https://spottystats.herokuapp.com/';
    redirect_uri = 'https://spottystats.herokuapp.com/api/callback/';
  }
}());

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = function (length) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const stateKey = 'spotify_auth_state';

const app = express();

app.use(express.static(`${__dirname}/dist`))
  .use(cors())
  .use(cookieParser());

app.get('/api/login', (req, res) => {
  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  const scope = 'user-read-private user-read-email user-top-read';

  res.redirect(`https://accounts.spotify.com/authorize?${
    querystring.stringify({
      response_type: 'code',
      client_id,
      scope,
      redirect_uri,
      state,
    })}`);
});

app.get('/api/callback', (req, res) => {
  // your application requests refresh and access tokens
  // after checking the state parameter

  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect(`/#${
      querystring.stringify({
        error: 'state_mismatch',
      })}`);
  } else {
    res.clearCookie(stateKey);
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code,
        redirect_uri,
        grant_type: 'authorization_code',
      },
      headers: {
        Authorization: `Basic ${new Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`,
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
            error: 'invalid_token',
          })}`);
      }
    });
  }
});

app.get('/api/refresh_token', (req, res) => {
  // requesting access token from refresh token
  const { refresh_token } = req.query;
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { Authorization: `Basic ${new Buffer.from(`${client_id}:${client_secret}`).toString('base64')}` },
    form: {
      grant_type: 'refresh_token',
      refresh_token,
    },
    json: true,
  };

  request.post(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const { access_token } = body;
      res.send({
        access_token,
      });
    }
  });
});

app.get('/api/logout', (req, res) => {
  res.clearCookie(stateKey);
  res.redirect(`${baseURL}home`);
});

console.log('Listening on 8888');
app.listen(process.env.PORT || 8888);
