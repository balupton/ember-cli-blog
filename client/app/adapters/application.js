import DS from "ember-data";

export default DS.JsonApiAdapter.extend({
  host: MyappENV.APP.API_HOST
});