import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import Ember from "ember";

export default Ember.Route.extend(ApplicationRouteMixin, {
	sessionInvalidated() {
		//data may still be viewed, so no window.reload needed
		//remove sessionInvalidated and go back to default ApplicationRouteMixin behaviour if you want to clear JS cache after logout
		this.transitionTo('index');
	},
});
