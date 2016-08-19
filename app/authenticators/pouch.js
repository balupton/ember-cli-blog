import Pouch from 'ember-simple-auth-pouch/authenticators/pouch';
import Ember from 'ember';
const { getOwner } = Ember;

export default Pouch.extend({
	init() {
	    this._super(...arguments);
		
	    let pouchAdapter = this.get('store').adapterFor('application');//getOwner(this).lookup(`adapter:${pouchAdapterName}`);

		this.db = pouchAdapter.remoteDb;
	}
});
