var db = new PouchDB('bloggr', {ajax: {timeout: 20000}});
db.sync('http://martinic.iriscouch.com/bloggr', {live: true});

export default EmberPouch.Adapter.extend({
  db: db
});