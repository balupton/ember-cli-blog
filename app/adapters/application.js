// You can enable CORS in CouchDB using:
//
// $ npm install -g add-cors-to-couchdb
// $ add-cors-to-couchdb

var db = new PouchDB('bloggr');
db.sync('http://localhost:5984/bloggr', {live: true});

export default EmberPouch.Adapter.extend({
  db: db
});