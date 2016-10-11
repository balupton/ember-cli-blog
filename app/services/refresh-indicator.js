import Ember from 'ember';

const { get, set, Service } = Ember;

export default Service.extend({
  spin: false,

  kickSpin: function(){
    if(!get(this, 'spin')){
      set(this, 'spin', true);
      //Set "spin = false" after a timeout.
      Ember.run.later(function(){
        set(this, 'spin', false);
      }.bind(this), 1000);
    }
  }
});
