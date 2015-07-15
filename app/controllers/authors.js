import Ember from "ember";
import pagedArray from 'ember-cli-pagination/computed/paged-array';

export default Ember.Controller.extend({
  page: 1,
  perPage: 5,

  pagedContent: pagedArray("arrangedContent", {pageBinding: "page", perPageBinding: "perPage"}),

  queryParams: ["page", "perPage"],

  totalPagesBinding: "pagedContent.totalPages",

  arrangedContent: function() {
    return Ember.ArrayProxy.createWithMixins(Ember.SortableMixin, {
      sortProperties: ['name'],
      sortAscending: true,
      sortFunction: function(v, w) {
        var lowerV = v.toLowerCase();
        var lowerW = w.toLowerCase();

        if (lowerV < lowerW) {
          return -1;
        }
        if (lowerV > lowerW) {
          return 1;
        }
        return 0;
      },
      content: this.get('model')
    });
  }.property('model')
});
