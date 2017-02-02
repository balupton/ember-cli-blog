import Ember from "ember";

export default Ember.Route.extend({
  model: function() {
    var store = this.store;
    return Ember.RSVP.hash({
      content: store.findAll('author'),
      posts: store.findAll('post')
    });
  },

  setupController: function(controller, models) {
    controller.setProperties(models);
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
