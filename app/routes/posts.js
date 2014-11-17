import Ember from "ember";

export default Ember.Route.extend({
	model: function() {
		return this.get('store').find('post');
	},
	
  afterModel: function (recordArray) {
    // This tells PouchDB to listen for live changes and
    // notify Ember Data when a change comes in.
    var db = new PouchDB('bloggr');
    db.setSchema([]);
    db.changes({
      since: 'now', 
      live: true
    }).on('change', function (change) {
      // notify Ember of changed/added items
      recordArray.update();
      // notify Ember of deleted items
      if (change.deleted) {
        var obj = db.rel.parseDocID(change.id);
        var rec = recordArray.store.recordForId(obj.type, obj.id);
        recordArray.removeRecord(rec);
      }
    });
  },

  actions: {
	  edit: function() {
			this.controllerFor('post').set('isEditing', true);
		},

		doneEditing: function() {
			this.controllerFor('post').set('isEditing', false);
			this.modelFor('post').save();
		},
		
		deletePost: function() {
      this.modelFor('post').destroyRecord().then(function() {
        this.transitionTo('posts');
      }.bind(this));
    },

    createPost: function() {
      this.send('edit');
      var newPost = this.get('store').createRecord('post');
      newPost.set('date' , new Date());
      newPost.set('author' , 'C.L.I. Ember');
      this.transitionTo('post', newPost.save());
    }
  }
  
});
