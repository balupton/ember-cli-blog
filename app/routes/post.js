import Ember from "ember";

export default Ember.Route.extend({
	model: function(params) {
		return this.get('store').find('post', params.post_id);
	},
	
	actions: {
	  edit: function() {
			this.controller.set('isEditing', true);
		},

		doneEditing: function() {
			this.controller.set('isEditing', false);
			this.get('controller.model').save();
		},
		
		deletePost: function() {
      this.get('controller.model').destroyRecord().then(function() {
        this.transitionTo('posts');
      }.bind(this));
    }
  }
});