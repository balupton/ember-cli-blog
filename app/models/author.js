import DS from "ember-data";

var Author = DS.Model.extend({
	name: DS.attr('string', {defaultValue: ""}),
	rev: DS.attr('string')
});

export default Author;