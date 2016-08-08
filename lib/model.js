var BackboneElasticsearch = BackboneElasticsearch || {};
BackboneElasticsearch.Model = Backbone.Model.extend({
  parse: function(response, _) {
    if(this._validResponse(response)) {
      return response["_source"];
    } else {
      return {};
    }
  },

  _validResponse: function(response) {
    return response && response["_source"];
  }
});
