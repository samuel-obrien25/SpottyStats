const getBaseURL = () => {
  let url;
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'DEVELOPMENT') {
    url = 'http://localhost:8080/';
  }

  if (process.env.NODE_ENV === 'STAGING') {
    url = 'https://spottystats-dev.herokuapp.com/';
  }

  if (process.env.NODE_ENV === 'PRODUCTION') {
    url = 'https://spottystats.herokuapp.com/';
  }

  return url;
};

module.exports = getBaseURL;
