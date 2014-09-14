import Ember from "ember";
export default Ember.Route.extend({
	model: function() {
		return this.get('store').find('post');
	},
  afterModel: function (recordArray) {
    // This tells PouchDB to listen for live changes and
    // notify Ember Data when a change comes in.
    new PouchDB('bloggr').changes({
      since: 'now',
      live: true
    }).on('change', function () {
      recordArray.update();
    });
  }
});
