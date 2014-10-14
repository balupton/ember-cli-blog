import Ember from "ember";

export default Ember.Route.extend({
	model: function() {
		return this.get('store').find('post');
	},
	
  afterModel: function (recordArray) {
    // This tells PouchDB to listen for live changes and
    // notify Ember Data when a change comes in.
    new PouchDB('bloggr').changes({
      since: 'now',
      live: true
    }).on('change', function () {
      recordArray.update();
    });
  },
  
  actions: {
    createPost: function() {
      this.controllerFor('post').set('isEditing', true);
      var newPost = this.get('store').createRecord('post');
      newPost.set('date' , new Date());
      newPost.set('author' , 'C.L.I. Ember');
      this.transitionTo('post', newPost.save());
    }
  },
});
