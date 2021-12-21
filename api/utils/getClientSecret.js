const getClientSecret = () => process.env.VUE_APP_CLIENT_SECRET || process.env.CLIENT_SECRET;

module.exports = getClientSecret;
