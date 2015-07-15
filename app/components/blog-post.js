import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    saveAction: function() {
      this.sendAction('saveAction');
    },
    deleteAction: function() {
      this.sendAction('deleteAction');
    }
  }
});
