import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
	this.route('about');
	this.route('secret');
	this.route('login');
	this.route('posts', function() {
		this.route('post', { path: ':post_id', resetNamespace: true });
	});
	this.route('authors', function() {
		this.route('author', { path: ':author_id', resetNamespace: true });
	});
});

export default Router;
