import Ember from "ember";

export default Ember.Route.extend({
	model: function() {
		return this.get('store').find('post');
	},

  afterModel: function() {
    var me = this;
    var authorsPromise = this.store.find('author');

    authorsPromise.then(function(authors) {
      me.controllerFor('posts').set('allAuthors',authors);
    });

    return authorsPromise;
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
