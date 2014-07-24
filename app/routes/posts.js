import Ember from "ember";
import Post from "myapp/models/post";
export default Ember.Route.extend({
  model: function() {
    return Post.all();
  }
});