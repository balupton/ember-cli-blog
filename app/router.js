import Ember from 'ember';

var Router = Ember.Router.extend({
	location: MyappENV.locationType
});

Router.map(function() {
	this.resource('about');
	this.resource('posts', function() {
		this.resource('post', { path: ':post_id' });
	});
});

export default Router;
