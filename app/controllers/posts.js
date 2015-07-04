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
    return computedFilterByQuery(
      this.get('arrangedContent'),
      ['title', 'body', 'author', 'excerpt'],
      this.get('query'),
      { conjunction: 'and', sort: false}
    );
  }.property('arrangedContent.@each.title', 'arrangedContent.@each.author', 'query')
 });