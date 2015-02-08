import config from '../config/environment';

var db = new PouchDB(config.local_couch || 'bloggr');
var remote = new PouchDB(config.remote_couch, {ajax: {timeout: 20000}});

function doSync() {
  db.sync(remote, {live: true})
    .on('error', function() {
      // Retry connection every 5 seconds
      setTimeout(doSync, 5000);
    });
}

doSync();

export default EmberPouch.Adapter.extend({
  db: db
});
