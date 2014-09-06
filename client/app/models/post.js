import DS from "ember-data";

var Post = DS.Model.extend({
	title: DS.attr('string', {defaultValue: ""}),
	author: DS.attr('string', {defaultValue: ""}),
	date: DS.attr('date'),
	excerpt: DS.attr('string', {defaultValue: ""}),
	body: DS.attr('string', {defaultValue: ""})
});

export default Post;