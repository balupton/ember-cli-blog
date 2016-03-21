import Ember from 'ember';
import config from '../config/environment';
import PouchDB from 'pouchdb';
import { Adapter } from 'ember-pouch';

var db = new PouchDB(config.local_couch || 'bloggr');
var remote = new PouchDB(config.remote_couch, {ajax: {timeout: 20000}});

db.sync(remote, {live: true, retry: true});

const { getOwner } = Ember;

export default Adapter.extend({
  db: db,

  unloadedDocumentChanged: function(obj) {
    var appController = getOwner(this).lookup("controller:application");
    appController.send('kickSpin');
      
    let store = this.get('store');
    let recordTypeName = this.getRecordTypeName(store.modelFor(obj.type));
    this.get('db').rel.find(recordTypeName, obj.id).then(function(doc) {
      store.pushPayload(recordTypeName, doc);
    });
  }
});
