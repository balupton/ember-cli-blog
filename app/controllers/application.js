import Ember from "ember";

export default Ember.Controller.extend({
	isSpinning: false,
	
	actions:{
	  kickSpin: function() {
      this.set('isSpinning', true);
    }
  }
});