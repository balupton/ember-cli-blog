var db = new PouchDB('bloggr');
db.sync('http://martinic.iriscouch.com/bloggr', {live: true});

export default EmberPouch.Adapter.extend({
  db: db
});