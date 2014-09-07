// import DS from "ember-data";

export default EmberPouch.Adapter.extend({
  db: new PouchDB('MyappDB')
});