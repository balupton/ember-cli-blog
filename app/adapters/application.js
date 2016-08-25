import Ember from 'ember';
import config from '../config/environment';
import PouchDB from 'pouchdb';
import { Adapter } from 'ember-pouch';

const { getOwner, assert, isEmpty } = Ember;

export default Adapter.extend({
  session: Ember.inject.service(),
  
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
	
	db.replicate.from(remoteDb, replicationOptions);
	
//NOTE: to detect errors with syncing, use the following.
//This will be called if a document can't be written in the demo due to logout on db
//	sync.on('denied', function(e) {
//		e.direction;//push/pull
//		e.doc;//document that failed replication, e.doc.reason has couch error message
//	});
	
	let pushReplication = null;
	remoteDb.on('loggedin', function() {
		//NOTE: remotedb needs to be recreated, since the taskqueue is marked as failed
		//		resetting the taskqueue could work too, but the initial fail mark could have stopped extra code
		//remoteDb.taskqueue.failed = false;
		//remoteDb.taskqueue.isReady = true;
		
		if (pushReplication) {
			pushReplication.cancel();
		}
		
		pushReplication = db.replicate.to(remoteDb, replicationOptions);
		
		pushReplication.on('denied', () => {
			//there was an error pushing, probably logged out outside of this app (couch/cloudant dashboard)
			self.get('session').invalidate();//this cancels the replication
			
			throw({message: "Replication failed. Check login?"});//prevent doc from being marked replicated
		}).on('error',() => {
			self.get('session').invalidate();//mark error by loggin out
		});
		
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
	}).on('loggedout', function() {
		if (pushReplication) {
			pushReplication.cancel();
		}
		pushReplication = null;
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
