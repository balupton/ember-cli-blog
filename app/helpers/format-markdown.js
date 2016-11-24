import Ember from 'ember';
import marked from 'marked';

export default Ember.Helper.helper(function(params) {
  let value = params[0];
  return Ember.String.htmlSafe(marked(value));
});
