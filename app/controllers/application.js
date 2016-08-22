import Ember from "ember";

export default Ember.Controller.extend({
	session: Ember.inject.service(),
	
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