import Ember from 'ember';
import config from '../config/environment';
import PouchDB from 'pouchdb';
import { Adapter } from 'ember-pouch';

const { assert, isEmpty, inject: {service} } = Ember;

export default Adapter.extend({
  session: service(),
  cloudState: service(),
  refreshIndicator: service(),

  init() {
    this._super(...arguments);

    let localDb = config.local_couch || 'blogger';

	  assert('local_couch must be set', !isEmpty(localDb));

	  let db = new PouchDB(localDb);
  	let self = this;

    let remoteDb = new PouchDB(config.remote_couch, {ajax: {timeout: 20000}});
    remoteDb.catch(function(e) {
	   	if (e.status === 401) {
      }
  	});

    let replicationOptions = {
	    live: true,
	    retry: true
  	};

	  db.replicate.from(remoteDb, replicationOptions).on('paused', function (err) {
      self.get('cloudState').setPull(!err);
    });

	  db.replicate.to(remoteDb, replicationOptions).on('denied', (err) => {
		  if (!err.id.startsWith('_design/')) {
			  //there was an error pushing, probably logged out outside of this app (couch/cloudant dashboard)
			  self.get('session').invalidate();//this cancels the replication

		    throw({message: "Replication failed. Check login?"});//prevent doc from being marked replicated
		  }
 	  }).on('paused',(err) => {
      self.get('cloudState').setPush(!err);
    }).on('error',() => {
   		self.get('session').invalidate();//mark error by loggin out
 	  });

    this.set('remoteDb', remoteDb);
    this.set('db', db);
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
