import Ember from 'ember';
import DS from "ember-data";
import { Model } from 'ember-pouch';

var Post = Model.extend({
  title: DS.attr('string', {defaultValue: ""}),
  author: DS.belongsTo('author'),
  date: DS.attr('date'),
  excerpt: DS.attr('string', {defaultValue: ""}),
  body: DS.attr('string', {defaultValue: ""}),

  // alias necessary for `components/blog-posts.hbs` usage of:
  // .property('arrangedContent.@each.title', 'arrangedContent.@each.authorName', 'query'),
  // as doing `arrangedContent.@each.author.name` returns https://github.com/DockYard/ember-composable-helpers/issues/177
  authorName: Ember.computed.readOnly('author.name')
});

export default Post;
