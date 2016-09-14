# Myapp

This README outlines the details of collaborating on this Ember application.

## Working example

[http://bloggr.exmer.com/](http://bloggr.exmer.com/)

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone` this repository
* `cd ember-cli-blog`
* `npm install`
* `bower install`
* install couchDB from http://couchdb.apache.org/
* `npm install -g add-cors-to-couchdb`
* `add-cors-to-couchdb`
* update `config/environment.js` `local_couch` and `remote_couch` to your CouchDB
  instance name.
* update `config/environment.js` `ENV.rootURL` in the production environment
* To use deploy create a file `.env.deploy.production` in the root of this project containing something like `db=https://username:password@martinic.cloudant.com/bloggr`

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build` (development)
* `ember build --environment production` (production)

## Deploy

To deploy to your CouchDB cluster

* `ember deploy production` (Set your credentials in the `.env.deploy.production` file)

## Authentication

ember-simple-auth-pouch authenticator with custom data adapter to setup push replication after login. See authenticators/pouch.js and adapters/application for further details.

## Authorization

### CouchDB write protected database:

Registration required example for write persmission: Add users in the normal CouchDB way and add the following design document.
```
{
   "_id": "_design/only_users_write",
   "validate_doc_update": "function (newDoc, oldDoc, userCtx) {\n\tif (!userCtx.name) {\n\t\tthrow({unauthorized: \"Only registered users can save data!\"});\n\t}\n}"
}
```

Or use any other role based check to validate your users if there are more applications on your database.

### Secret route

There is one `secret` route setup to demonstrate how to use ember-simple-auth to protect routes. More instructions can be read there.

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://ember-cli.com/)
* [ember-cli-deploy-couchdb](https://github.com/martinic/ember-cli-deploy-couchdb)
* [ember-simple-auth](https://ember-simple-auth.com/)
* [ember-simple-auth-pouch](https://github.com/martinic/ember-simple-auth-pouch)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
