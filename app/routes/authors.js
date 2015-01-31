import Ember from "ember";

export default Ember.Route.extend({
	model: function() {
		return this.get('store').find('author');
	},
	
  actions: {
	  edit: function() {
			this.controllerFor('author').set('isEditing', true);
		},

		doneEditing: function() {
			this.controllerFor('author').set('isEditing', false);
			this.modelFor('author').save();
		},
		
		deleteAuthor: function() {
      this.modelFor('author').destroyRecord().then(function() {
        this.transitionTo('authors');
      }.bind(this));
    },

    createAuthor: function() {
      this.send('edit');
      var newauthor = this.get('store').createRecord('author');
      this.transitionTo('author', newauthor.save());
    }
  }
  
});
