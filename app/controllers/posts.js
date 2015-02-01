import Ember from "ember";
import pagedArray from 'ember-cli-pagination/computed/paged-array';

export default Ember.ArrayController.extend({
  sortProperties: ['date'],
  sortAscending: false,
  
  page: 1,
  perPage: 5,

  pagedContent: pagedArray("filteredContent", {pageBinding: "page", perPageBinding: "perPage"}),

  queryParams: ["page", "perPage", "query"],

  totalPagesBinding: "pagedContent.totalPages",
  
  filteredContent: function() {
    if (this.get('query')) {
      return this.get('arrangedContent').filter(function(item) {
        var query = this.get('query').toLowerCase(),
            title = (item.get('title') || '').toLowerCase(),
            body = (item.get('body') || '').toLowerCase();

        return title.match(query) || body.match(query);
      }.bind(this));
    }
    return this.get('arrangedContent');
  }.property('arrangedContent', 'query')
});