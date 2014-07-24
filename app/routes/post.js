import Ember from "ember";
export default Ember.Route.extend({
  model: function(params) {
    return this.store.findBy('id', params.post_id);
  }
});