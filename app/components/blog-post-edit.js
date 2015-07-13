import Ember from 'ember';

export default Ember.Component.extend({
  authorlist: function() {
    var selected = this.get('post.author'); // author from post model
    var content = [];
    if (selected !== null) {
      content.push(selected);
    }

    this.get('authors').forEach(function(listAuthorObj) {
      var listName = listAuthorObj.get('name');
      if (selected !== listName) {
        content.push(listName);
      }
    });

    return content.sort();
  }.property("post.author", "authors"),


  actions: {
    edit: function() {
      this.set('isEditing', true);
    },

    doneEditing: function() {
      this.set('isEditing', false);
      this.sendAction('saveAction');
    },

    deletePost: function() {
      this.sendAction('deleteAction');
    }
  }
});
