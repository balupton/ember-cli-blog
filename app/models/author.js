import DS from "ember-data";
import { Model } from 'ember-pouch';

var Author = Model.extend({
  name: DS.attr('string', {defaultValue: ""}),
  posts: DS.hasMany('posts')
});

export default Author;
