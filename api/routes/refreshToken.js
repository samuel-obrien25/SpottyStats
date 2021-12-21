const request = require('request');
const { TOKEN_URL } = require('../Constants');
const getClientId = require('../utils/getClientId');
const getClientSecret = require('../utils/getClientSecret');

const refreshToken = (req, res) => {
  // requesting access token from refresh token
  const { refresh_token } = req.query;
  const client_id = getClientId();
  const client_secret = getClientSecret();
  const authOptions = {
    url: TOKEN_URL,
    headers: {
      Authorization: `Basic ${new Buffer.from(
        `${client_id}:${client_secret}`,
      ).toString('base64')}`,
    },
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
};

module.exports = refreshToken;
