export default function config (url) {
	return {
		name: 'dev',
    db: 'mongodb://localhost/seed',
    sessionSecret: 'sprawledCounterfeitCountersignedLozenge',
    facebook: {
      clientID: 'get_from_developers.facebook.com',
      clientSecret: 'get_from_developers.facebook.com',
      callbackURL: url+'/oauth/facebook/callback',
    },
    twitter: {
      clientID: 'get_from_dev.twitter.com',
      clientSecret: 'get_from_dev.twitter.com',
      callbackURL: url+'/oauth/twitter/callback',
    },
    google: {
      clientID: 'get_from_console.developers.google.com',
      clientSecret: 'get_from_console.developers.google.com',
      callbackURL: url+'/oauth/google/callback',
    },
	}
}
