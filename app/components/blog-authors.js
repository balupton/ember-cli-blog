import Ember from 'ember';
import pagedArray from 'ember-cli-pagination/computed/paged-array';

export default Ember.Component.extend({

  pagedContent: pagedArray("arrangedContent", {pageBinding: "page", perPageBinding: "perPage"}),

  totalPagesBinding: "pagedContent.totalPages",

  authorsSorting: ['name'],
  arrangedContent: Ember.computed.sort('authors', 'authorsSorting'),

  actions: {
    createAuthor: function() {
      this.sendAction('createAction');
    }
  }
});
