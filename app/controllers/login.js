import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

  actions: {
    authenticate() {
      let { identification, password } = this.getProperties('identification', 'password');
      this.get('session').authenticate('authenticator:pouch', identification, password).then(() => {
      	this.setProperties({identification: '', password: ''});
      }).catch((reason) => {
        this.set('errorMessage', reason.message || reason);
      });
    }
  }
});
