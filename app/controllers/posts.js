import Ember from "ember";
import pagedArray from 'ember-cli-pagination/computed/paged-array';

export default Ember.ArrayController.extend({
  sortProperties: ['date'],
  sortAscending: false,
  
  queryParams: ["page", "perPage"],
  
  pagedContent: pagedArray('arrangedContent', {perPage: 5}),
  
  pageBinding: "pagedContent.page",
  perPageBinding: "pagedContent.perPage",
  totalPagesBinding: "pagedContent.totalPages"
});