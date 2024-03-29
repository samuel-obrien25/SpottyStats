var express = require('express');
var request = require('request');
var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
require('dotenv').config();

var client_id = process.env.VUE_APP_CLIENT_ID || process.env.CLIENT_ID;
var client_secret = process.env.VUE_APP_CLIENT_SECRET || process.env.CLIENT_SECRET;
let baseURL;
let redirect_uri;

(function () {
  if (process.env.NODE_ENV == 'DEVELOPMENT') {
    baseURL = 'http://localhost:8080/';
    redirect_uri = 'http://localhost:8888/api/callback/';
  }

  if (process.env.NODE_ENV == 'STAGING') {
    baseURL = 'https://spottystats-dev.herokuapp.com/';
    redirect_uri = 'https://spottystats-dev.herokuapp.com/api/callback/';
  }

  if (process.env.NODE_ENV == 'PRODUCTION') {
    baseURL = 'https://spottystats.herokuapp.com/';
    redirect_uri = 'https://spottystats.herokuapp.com/api/callback/';
  }
})();

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };
  
  var stateKey = 'spotify_auth_state';
  
  var app = express();
  
  app.use(express.static(__dirname + '/dist'))
     .use(cors())
     .use(cookieParser());
  
  app.get('/api/login', function(req, res) {
  
    var state = generateRandomString(16);
    res.cookie(stateKey, state);
  
    // your application requests authorization
    var scope = 'user-read-private user-read-email user-top-read';

    res.redirect('https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
      }));
  });
  
  app.get('/api/callback', function(req, res) {
  
    // your application requests refresh and access tokens
    // after checking the state parameter
  
    var code = req.query.code || null;
    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies[stateKey] : null;
  
    if (state === null || state !== storedState) {
      res.redirect('/#' +
        querystring.stringify({
          error: 'state_mismatch'
        })
      );
    } else {
      res.clearCookie(stateKey);
      var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
          code: code,
          redirect_uri: redirect_uri,
          grant_type: 'authorization_code'
        },
        headers: {
          'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
        },
        json: true
      };
  
      request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
  
          var access_token = body.access_token,
              refresh_token = body.refresh_token;
  
          res.redirect(baseURL + '?' +
            querystring.stringify({
              access_token: access_token,
              refresh_token: refresh_token
            }));
        } else {
          res.redirect('/#' +
            querystring.stringify({
              error: 'invalid_token'
            }));
        }
      });
    }
  });
  
  app.get('/api/refresh_token', function(req, res) {
  
    // requesting access token from refresh token
    var refresh_token = req.query.refresh_token;
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      headers: { 'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64')) },
      form: {
        grant_type: 'refresh_token',
        refresh_token: refresh_token
      },
      json: true
    };
  
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var access_token = body.access_token;
        res.send({
          'access_token': access_token
        });
      }
    });
  });

  app.get('/api/logout', function(req, res) {
    res.clearCookie(stateKey);
    res.redirect(baseURL + 'home');
  });
  
  console.log('Listening on 8888');
  app.listen(process.env.PORT || 8888);
