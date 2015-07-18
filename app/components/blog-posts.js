import Ember from 'ember';
import pagedArray from 'ember-cli-pagination/computed/paged-array';
import computedFilterByQuery from 'ember-cli-filter-by-query/util/filter';

export default Ember.Component.extend({

  pagedContent: pagedArray("filteredContent", {pageBinding: "page", perPageBinding: "perPage"}),

  totalPagesBinding: "pagedContent.totalPages",

  arrangedContent: function() {
    return Ember.ArrayProxy.extend(Ember.SortableMixin).create({
      sortProperties: ['date'],
      sortAscending: false,
      content: this.get('posts')
    });
  }.property('posts'),

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
