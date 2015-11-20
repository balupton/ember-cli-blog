import Ember from 'ember';
import pagedArray from 'ember-cli-pagination/computed/paged-array';
import computedFilterByQuery from 'ember-cli-filter-by-query/util/filter';

export default Ember.Component.extend({

  pagedContent: pagedArray("filteredContent", {pageBinding: "page", perPageBinding: "perPage"}),

  totalPagesBinding: "pagedContent.totalPages",

  postsSorting: ['date:desc'],
  arrangedContent: Ember.computed.sort('posts', 'postsSorting'),

  filteredContent: function() {
    return computedFilterByQuery(
      this.get('arrangedContent'),
      ['title', 'body', 'author', 'excerpt'],
      this.get('query'),
      { conjunction: 'and', sort: false}
    );
  }.property('arrangedContent.@each.title', 'arrangedContent.@each.author', 'query'),

  actions: {
    createPost: function() {
      this.sendAction('createAction');
    }
  }
});
