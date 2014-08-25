import DS from "ember-data";

export default DS.RESTAdapter.extend({
// export default DS.JsonApiAdapter({
  host: MyappENV.APP.API_HOST
});