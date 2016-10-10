import Ember from "ember";

const { set, get, inject: {service} } = Ember;

export default Ember.Controller.extend({
	session: service(),
  cloudState: service(),

	isSpinning: false,

	actions:{
	  kickSpin: function() {
      set(this, 'isSpinning', true);
    },
    logout: function() {
    	get(this, 'session').invalidate();
    },
  }
});
