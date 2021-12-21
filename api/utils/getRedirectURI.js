const getRedirectURI = () => {
  let uri;
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'DEVELOPMENT') {
    uri = 'http://localhost:8888/api/callback/';
  }

  if (process.env.NODE_ENV === 'STAGING') {
    uri = 'https://spottystats-dev.herokuapp.com/api/callback/';
  }

  if (process.env.NODE_ENV === 'PRODUCTION') {
    uri = 'https://spottystats.herokuapp.com/api/callback/';
  }
  return uri;
};

module.exports = getRedirectURI;
