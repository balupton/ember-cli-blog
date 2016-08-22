import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import Ember from "ember";

export default Ember.Route.extend(ApplicationRouteMixin, {
	sessionInvalidated() {
		//data may still be viewed, so no window.reload needed
		this.transitionTo('index');
	},
});
