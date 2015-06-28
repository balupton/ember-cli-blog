import Ember from "ember";
import pagedArray from 'ember-cli-pagination/computed/paged-array';
import computedFilterByQuery from 'ember-cli-filter-by-query/util/filter';

export default Ember.ArrayController.extend({
  sortProperties: ['date'],
  sortAscending: false,
  
  page: 1,
  perPage: 5,

  pagedContent: pagedArray("filteredContent", {pageBinding: "page", perPageBinding: "perPage"}),

  queryParams: ["page", "perPage", "query"],

  totalPagesBinding: "pagedContent.totalPages",
  
  filteredContent: function() {
    var arrangedContentArray = Ember.makeArray(this.get('arrangedContent'));
    return computedFilterByQuery(
      arrangedContentArray,
      ['title', 'body', 'author', 'excerpt'],
      this.get('query'),
      { conjunction: 'and' }
    );
  }.property('arrangedContent.@each.title', 'arrangedContent.@each.author', 'query')
});