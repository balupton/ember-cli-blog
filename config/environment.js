/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'myapp',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    emberpouch: {
      dontsavehasmany: true
    },

    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  ENV.manifest = {
    enabled: true,
    appcacheFile: "/manifest.appcache",
    excludePaths: ['index.html'],
    includePaths: ['/'],
    howCreateDate: true
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }


  ENV.remote_couch = false;  // 'http://localhost:5984/bloggr';
  ENV.local_couch = 'bloggr';
  ENV.authAdapter = 'application';
  if (environment === 'production') {
    ENV.rootURL = '/';
    ENV.remote_couch = 'https://martinic.cloudant.com/bloggr';
  }
  if ( ENV.remote_couch ) {
    // @TODO document why `contentSecurityPolicy` is needed, as it does not appear used anywhere else
    var remote_couch_hostname = ENV.remote_couch.substring(0, ENV.remote_couch.indexOf('/', 9))
    ENV.contentSecurityPolicy = {
      'connect-src': "'self' " + remote_couch_hostname
    };
  }

  return ENV;
};
