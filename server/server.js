var fortune = require('fortune')
  , app = fortune({
    db: 'myapp'
  })
  .resource('post', {
    title: String,
    author: String,
	date: Date,
	excerpt: String,
	body: String
  })
  .resource('test', {
    title: String
  })
  .listen(1337);
  
  // {"posts": [{
   // "title": "String2",
   // "author": "author2",
   // "date": "2012-04-23T18:25:43.511Z",
   // "excerpt": "excerpt2",
   // "body": "body2"
  // }]}