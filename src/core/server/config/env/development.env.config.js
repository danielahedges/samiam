const url = process.env.APP_URL || 'http://localhost:6005';

module.exports = {
  name: 'dev',
  db: 'mongodb://localhost/monocot',
  sessionSecret: 'sprawledCounterfeitCountersignedLozenge',
  facebook: {
    enabled: !!process.env.FACEBOOK_OAUTH_ENABLED,
    clientID: process.env.FACEBOOK_OAUTH_CLIENTID,
    clientSecret: process.env.FACEBOOK_OAUTH_SECRET,
    callbackURL: url + '/oauth/facebook/callback'
  },
  twitter: {
    enabled: !!process.env.TWITTER_OAUTH_ENABLED,
    clientID: process.env.TWITTER_OAUTH_CLIENTID,
    clientSecret: process.env.TWITTER_OAUTH_SECRET,
    callbackURL: url + '/oauth/twitter/callback'
  },
  google: {
    enabled: !!process.env.GOOGLE_OAUTH_ENABLED,
    clientID: process.env.GOOGLE_OAUTH_CLIENTID,
    clientSecret: process.env.GOOGLE_OAUTH_SECRET,
    callbackURL: url + '/oauth/google/callback'
  }
};
