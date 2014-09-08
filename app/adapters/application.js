var db = new PouchDB('bloggr');
db.sync('http://localhost:5984/bloggr', {live: true});

export default EmberPouch.Adapter.extend({
  db: db
});