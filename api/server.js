const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
require('dotenv').config();

const app = express();

const callback = require('./routes/callback');
const login = require('./routes/login');
const logout = require('./routes/logout');
const refreshToken = require('./routes/refreshToken');

app.use(express.static(`${__dirname}/dist`))
  .use(cors())
  .use(cookieParser());

app.get('/api/callback', callback);
app.get('/api/login', login);
app.get('/api/logout', logout);
app.get('/api/refresh_token', refreshToken);

console.log('Listening on 8888');
app.listen(process.env.PORT || 8888);
