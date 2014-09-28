import Ember from "ember";

export default Ember.ArrayController.extend({
  actions: {
    createPost: function() {
      this.controllerFor('post').send('edit');
      var newPost = this.get('store').createRecord('post');
      newPost.set('date' , new Date());
      newPost.set('author' , 'C.L.I. Ember');
      this.get('target').transitionTo('post', newPost.save());
    }
  },
  sortProperties: ['date']
});