const { STATE_KEY } = require('../Constants');
const getBaseURL = require('../utils/getBaseURL');

const logout = (req, res) => {
  const baseURL = getBaseURL();
  res.clearCookie(STATE_KEY);
  res.redirect(`${baseURL}home`);
};

module.exports = logout;
