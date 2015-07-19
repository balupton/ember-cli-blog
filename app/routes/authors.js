import Ember from "ember";

export default Ember.Route.extend({
	model: function() {
		return this.store.findAll('author');
	},

  actions: {
		createAuthor: function() {
      this.controllerFor('author').set('globals.isEditing', true);
      var newauthor = this.store.createRecord('author');
      this.transitionTo('author', newauthor.save());
    },

		saveAuthor: function() {
			this.modelFor('author').save();
		},

		deleteAuthor: function() {
      this.modelFor('author').destroyRecord().then(function() {
        this.transitionTo('authors');
      }.bind(this));
    }
  }

});
