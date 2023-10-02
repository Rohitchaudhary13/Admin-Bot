// config.js

module.exports = {
    google: {
      clientID: '910265626984-mb7fmevi3ognb52h4n9f2pf0d5sa1fsu.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3000/auth/google/callback',
    },
    session: {
      secret: 'radhekrishna',
    },
    mongodb: {
      uri: 'mongodb+srv://styyx:astconsulting@cluster0.ktj7oo6.mongodb.net/?retryWrites=true&w=majority',
    },
  };
  