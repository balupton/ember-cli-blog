import Ember from 'ember';
import pagedArray from 'ember-cli-pagination/computed/paged-array';

export default Ember.Component.extend({
  authorsSorting: ['name'],
  arrangedContent: Ember.computed.sort('authors', 'authorsSorting'),

  pagedContent: pagedArray('arrangedContent', {
    page: Ember.computed.alias('parent.page'),
    perPage: Ember.computed.alias('parent.perPage')
  }),

  actions: {
    createAuthor: function() {
      this.sendAction('createAction');
    }
  }
});
