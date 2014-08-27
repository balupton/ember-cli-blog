import Ember from "ember";
export default Ember.ObjectController.extend({
	isEditing: false,

	actions: {
		edit: function() {
			this.set('isEditing', true);
		},

		doneEditing: function() {
			this.set('isEditing', false);
			this.get('model').save();
		},
		
		deletePost: function() {
      this.get('model').destroyRecord().then(function() {
        this.get('target').transitionTo('posts');
      }.bind(this));
    }
	}
});