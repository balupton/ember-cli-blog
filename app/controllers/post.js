import Ember from "ember";

export default Ember.ObjectController.extend({
  needs: "posts",
	isEditing: false,

  authorlistBinding: 'controllers.posts.allAuthors'
});