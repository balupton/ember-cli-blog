var db = new PouchDB('bloggr');
var remote = new PouchDB('http://martinic.iriscouch.com/bloggr', {ajax: {timeout: 20000}})
db.sync(remote, {live: true});

export default EmberPouch.Adapter.extend({
  db: db
});