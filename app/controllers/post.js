import Ember from "ember";

export default Ember.ObjectController.extend({
  needs: "posts",
	isEditing: false,

  authorlist: function() {
    var selected = this.get('author'); // author from post model    
    var content = [];    
    if (selected !== null) {    
      content.push(selected);    
    }

    this.get('controllers.posts.allAuthors').forEach(function(listAuthorObj) {
      var listName = listAuthorObj.get('name');
      if (selected !== listName) {
        content.push(listName);
      }
    });

    return content;
  }.property("author")
});