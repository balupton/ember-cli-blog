import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import Ember from "ember";

export default Ember.Route.extend(ApplicationRouteMixin, {
	sessionInvalidated() {
		//nothing to do, data may still be viewed, so no window.reload needed
	},
});
