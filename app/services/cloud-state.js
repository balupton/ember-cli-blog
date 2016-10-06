import Ember from 'ember';

const { set, Service } = Ember;

export default Service.extend({
  cloudPush: false,
  cloudPull: false,

  setPush (val) {
    set(this, 'cloudPush', (val));
  },

  setPull (val) {
    set(this, 'cloudPull', (val));
  }
});
