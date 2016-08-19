import Ember from 'ember';
import config from '../config/environment';
import PouchDB from 'pouchdb';
import { Adapter } from 'ember-pouch';

const { getOwner, assert, isEmpty } = Ember;

export default Adapter.extend({
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
	
	let sync = db.sync(remoteDb, {
	  live: true,
	  retry: true
	});
	
	remoteDb.on('loggedin', function() {
		//NOTE: remotedb needs to be recreated, since the taskqueue is marked as failed
		//		resetting the taskqueue could work too, but the initial fail mark could have stopped extra code
		//remoteDb.taskqueue.failed = false;
		//remoteDb.taskqueue.isReady = true;
//		remoteDb = new PouchDB(config.remote_couch, {ajax: {timeout: 20000}});
//		self.set('remoteDb', remoteDb);
//		
//		//stop old sync
//		sync.push.cancel();
//		sync.pull.cancel();
//		
//		sync = db.sync(remoteDb, {
//		  live: true,
//		  retry: true
//		});
	});
		
	this.set('remoteDb', remoteDb);
    this.set('db', db);
  },

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
