import Ember from 'ember';
import config from '../config/environment';
import PouchDB from 'pouchdb';
import { Adapter } from 'ember-pouch';

const { assert, isEmpty, inject: {service} } = Ember;

export default Adapter.extend({
  coalesceFindRequests: false,  // Temp fix for embr-data Bug https://github.com/emberjs/data/issues/4463

  session: service(),
  cloudState: service(),
  refreshIndicator: service(),

  init() {
    this._super(...arguments);

    const localDb = config.local_couch || 'blogger';

    assert('local_couch must be set', !isEmpty(localDb));

    const db = new PouchDB(localDb);
    this.set('db', db);

    // If we have specified a remote CouchDB instance, then replicate our local database to it
    if ( config.remote_couch ) {
      const remoteDb = new PouchDB(config.remote_couch, {ajax: {timeout: 20000}});

      const replicationOptions = {
        live: true,
        retry: true
      };

      db.replicate.from(remoteDb, replicationOptions).on('paused', (err) => {
        this.get('cloudState').setPull(!err);
      });

      db.replicate.to(remoteDb, replicationOptions).on('denied', (err) => {
        if (!err.id.startsWith('_design/')) {
          //there was an error pushing, probably logged out outside of this app (couch/cloudant dashboard)
          this.get('session').invalidate();//this cancels the replication

          throw({message: "Replication failed. Check login?"});//prevent doc from being marked replicated
        }
      }).on('paused',(err) => {
        this.get('cloudState').setPush(!err);
      }).on('error',() => {
        this.get('session').invalidate();//mark error by loggin out
      });

      this.set('remoteDb', remoteDb);
    }

    return this;
  },

  unloadedDocumentChanged: function(obj) {
    this.get('refreshIndicator').kickSpin();

    let store = this.get('store');
    let recordTypeName = this.getRecordTypeName(store.modelFor(obj.type));
    this.get('db').rel.find(recordTypeName, obj.id).then(function(doc) {
      store.pushPayload(recordTypeName, doc);
    });
  }
});
