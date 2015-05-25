import DS from "ember-data";
import { Model } from 'ember-pouch';

var Author = Model.extend({
	name: DS.attr('string', {defaultValue: ""})
});

export default Author;