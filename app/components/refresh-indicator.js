import Ember from 'ember';

const {set, get} = Ember;

export default Ember.Component.extend({
  spin: false,

  monitorSpin: function(){
    if(get(this, 'spin')){
      //Set "spin = false" after a timeout.
      Ember.run.later(function(){
        set(this, 'spin', false);
      }.bind(this), 1000);
    }
  }.observes('spin')
});
