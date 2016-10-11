import Ember from "ember";

const { get, inject: {service} } = Ember;

export default Ember.Controller.extend({
	session: service(),
  cloudState: service(),

	actions:{
    logout: function() {
    	get(this, 'session').invalidate();
    }
  }
});
