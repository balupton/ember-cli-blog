import Ember from "ember";

export default Ember.Controller.extend({
  needs: "posts",
  authors: function () {
    // we can access authors on the posts controller thanks to the needs declaration above
    return this.get('controllers.posts.authors');
  }.property("controllers.posts.authors.@each.name")
});
