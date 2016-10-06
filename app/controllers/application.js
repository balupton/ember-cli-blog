import Ember from "ember";

const { inject: {service} } = Ember;

export default Ember.Controller.extend({
	session: service(),
  cloudState: service(),

	isSpinning: false,

	actions:{
	  kickSpin: function() {
      this.set('isSpinning', true);
    },
    logout: function() {
    	this.get('session').invalidate();
    },
  }
});
