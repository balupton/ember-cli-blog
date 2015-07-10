import Ember from "ember";

export default Ember.Route.extend({
  model: function() {
    var store = this.store;
    return Ember.RSVP.hash({
      posts: store.findAll('post'),
      authors: store.findAll('author')
    });
  },

  setupController: function(controller, models) {
    var posts = models.posts;
    var authors = models.authors;

    this.controllerFor('posts').set('content', posts);
    this.controllerFor('posts').set('allAuthors', authors);
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
      var newPost = this.store.createRecord('post');
      newPost.set('date' , new Date());
      newPost.set('author' , 'C.L.I. Ember');
      this.transitionTo('post', newPost.save());
    }
  }
  
});
