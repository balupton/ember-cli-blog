import Ember from 'ember';

export default Ember.Helper.helper(function(params) {
  let value = params[0];
  return Ember.String.htmlSafe(marked(value));
});
