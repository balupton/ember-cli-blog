import Ember from "ember";
import pagedArray from 'ember-cli-pagination/computed/paged-array';

export default Ember.ArrayController.extend({
  sortProperties: ['date'],
  sortAscending: false,
  
  pagedContent: pagedArray('content', {perPage: 5})
});