import Ember from "ember";
var showdown = new Showdown.converter();
export default Ember.Handlebars.makeBoundHelper(function(value) {
  return new Ember.Handlebars.SafeString(showdown.makeHtml(value));
});