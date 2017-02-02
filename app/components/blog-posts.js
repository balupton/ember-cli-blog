import Ember from 'ember';
import pagedArray from 'ember-cli-pagination/computed/paged-array';
import computedFilterByQuery from 'ember-cli-filter-by-query/util/filter';

// define the handling of the `templates/components/blog-posts.hbs` view, which is used by `posts.hbs` like so:
// => {{#blog-posts posts=model page=page perPage=perPage query=query createAction="createPost"}}{{outlet}}{{/blog-posts}}
// `posts.hbs` gets its params by defining
// => queryParams: ["page", "perPage", "query"]
// inside its controller located at `controllers/posts.js`
export default Ember.Component.extend({
  // take in `posts` from our view
  // and sort it via `postsSorting`
  // into `arrangedContent`
  postsSorting: ['date:desc'],
  arrangedContent: Ember.computed.sort('posts', 'postsSorting'),

  // `arrangedContent` is then used by this filter to create `filteredContent`
  filteredContent: function() {
    return computedFilterByQuery(
      this.get('arrangedContent'),
      ['title', 'body', 'authorName', 'excerpt'],
      this.get('query'),
      { conjunction: 'and', sort: false}
    );
  }.property('arrangedContent.@each.title', 'arrangedContent.@each.authorName', 'query'),

  // `filteredContent` is then used by this to create the paged array
  // which is used by our view like so
  // => {{#each pagedContent as |post|}}
  // => {{page-numbers content=pagedContent}}
  pagedContent: pagedArray('filteredContent', {
    page: Ember.computed.alias('parent.page'),
    perPage: Ember.computed.alias('parent.perPage')
  }),

  // define the actions, used by our view like so:
  // => <button {{action 'createPost'}}>Create</button>
  actions: {
    createPost: function() {
      this.sendAction('createAction');
    }
  }
});
