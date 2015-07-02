import Ember from 'ember';

export default Ember.Component.extend({
  spin: false,
  
  monitorSpin: function(){
    if(this.get('spin')){
      //Set "spin = false" after a timeout.
      Ember.run.later(function(){
        this.get('monitorSpin'); // Make sure the Spinner stops if observes does not see change
        this.set('spin', false);
      }.bind(this), 1000);
    }
  }.observes('spin')
});
