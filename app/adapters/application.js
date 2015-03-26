import config from '../config/environment';

var db = new PouchDB(config.local_couch || 'bloggr');
var remote = new PouchDB(config.remote_couch, {ajax: {timeout: 20000}});

db.sync(remote, {live: true, retry: true});

export default EmberPouch.Adapter.extend({
  db: db,
  
  // Change watcher for ember-data
  immediatelyLoadAllChangedRecords: function() {
    this.db.changes({
      since: 'now',
      live: true,
      returnDocs: false
    }).on('change', function (change) {
      var obj = this.db.rel.parseDocID(change.id);
      // skip changes for non-relational_pouch docs. E.g., design docs.
      if (!obj.type || obj.type === '') { return; }
      var store = this.container.lookup('store:main');
      store.find(obj.type);
    }.bind(this));
  }.on('init')
});
