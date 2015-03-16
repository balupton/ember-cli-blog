import config from '../config/environment';

var db = new PouchDB(config.local_couch || 'bloggr');
var remote = new PouchDB(config.remote_couch, {ajax: {timeout: 20000}});

db.sync(remote, {live: true, retry: true});

export default EmberPouch.Adapter.extend({
  db: db
});
