import Ember from "ember";

export default Ember.Controller.extend({
  needs: "posts",
	isEditing: false,

  authorlist: function() {
    console.log("authorlist");
    var selected = this.get('model.author'); // author from post model    
    var content = [];    
    if (selected !== null) {    
      content.push(selected);    
    }

    // we can access allAuthors on the posts controller thanks to the needs declaration above
    this.get('controllers.posts.allAuthors').forEach(function(listAuthorObj) {
      var listName = listAuthorObj.get('name');
      if (selected !== listName) {
        content.push(listName);
      }
    });

    return content.sort();
  }.property("model.author", "controllers.posts.allAuthors.@each.name")
});