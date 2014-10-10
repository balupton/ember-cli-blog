var db = new PouchDB('bloggr');
var remote = new PouchDB('http://localhost:5984/bloggr', {ajax: {timeout: 20000}});
db.sync(remote, {live: true});

export default EmberPouch.Adapter.extend({
  db: db
});