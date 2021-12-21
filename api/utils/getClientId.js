const getClientId = () => process.env.VUE_APP_CLIENT_ID || process.env.CLIENT_ID;

module.exports = getClientId;
