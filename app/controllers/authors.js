import Ember from "ember";
import pagedArray from 'ember-cli-pagination/computed/paged-array';

export default Ember.ArrayController.extend({
  sortProperties: ['name'],
  sortAscending: true,
  
  page: 1,
  perPage: 5,

  pagedContent: pagedArray("arrangedContent", {pageBinding: "page", perPageBinding: "perPage"}),

  queryParams: ["page", "perPage"],

  totalPagesBinding: "pagedContent.totalPages"
});