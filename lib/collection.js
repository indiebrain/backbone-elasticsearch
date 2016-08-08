var BackboneElasticsearch = BackboneElasticsearch || {};
BackboneElasticsearch.Collection = Backbone.Collection.extend({
  _validCollectionResponse: function(response) {
    return response && response.hits && response.hits.hits;
  },
  parse: function(response, _) {
    if(this._validCollectionResponse(response)) {
      var hits = response.hits.hits;
      var data = [];
      for(var index = 0; index < hits.length; index++) {
        data.push(hits[index]["_source"]);
      }
      return data;
    }
    else {
      return [];
    }
  }

});
