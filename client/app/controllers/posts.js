import Ember from "ember";

export default Ember.ObjectController.extend({
  actions: {
    createPost: function() {
      var newPost = this.get('store').createRecord('post', this.get('post'));
      newPost.set('date' , new Date());
      newPost.set('author' , 'C.L.I. Ember');
      this.get('target').transitionTo('post', newPost.save());
    }
  }
});