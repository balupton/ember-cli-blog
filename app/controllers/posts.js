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
            name = (item.get('title') || '').toLowerCase(),
            desc = (item.get('body') || '').toLowerCase();

        return name.match(query) || desc.match(query);
      }.bind(this));
    }
    return this.get('arrangedContent');
  }.property('arrangedContent', 'query')
});