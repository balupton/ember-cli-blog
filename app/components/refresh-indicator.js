import Ember from 'ember';

export default Ember.Component.extend({
  spin: false,
  
  monitorSpin: function(){
    if(this.get('spin')){
      //Do Asynchronous action here. Set "isSpinning = false" after a timeout.
      Ember.run.later(function(){
        this.set('spin', false);
      }.bind(this), 1000);
    }
  }.observes('spin')
});
