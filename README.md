# Myapp

This README outlines the details of collaborating on this Ember application.

## Installation

* `git clone` this repository
* `cd client`
* `npm install`
* `bower install`

* `cd server`
* `npm install fortune`

Start the server. In the Chrome Postman plug-in
Add header `Content-Type` with value `application/json`

POST to 127.0.0.1:1337/posts/

    {"posts": [{
     "title": "String1",
     "author": "author1",
     "date": "2014-08-25T18:25:43.511Z",
     "excerpt": "excerpt1",
     "body": "body1"
    }]}


## Running
* `cd server`
* `node server.js`

* `cd client`
* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://iamstef.net/ember-cli/](http://iamstef.net/ember-cli/).
