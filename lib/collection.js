var BackboneElasticsearch = BackboneElasticsearch || {};
BackboneElasticsearch.Collection = Backbone.Collection.extend({
  parse: function(response, _) {
    if(this._validCollectionResponse(response)) {
      var hits = response.hits.hits;
      var data = [];
      for(var index = 0; index < hits.length; index++) {
        data.push(hits[index]._source);
      }
      return data;
    }
    else {
      return [];
    }
  },

  _validCollectionResponse: function(response) {
    return response && response.hits && response.hits.hits;
  }
});
