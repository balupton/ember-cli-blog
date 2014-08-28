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
  .listen(1337);
  
 