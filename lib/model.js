var BackboneElasticsearch = BackboneElasticsearch || {};
(function() {
  BackboneElasticsearch.Model = Backbone.Model.extend({
    url: function() {
      if(_.result(this, 'elasticsearchIndex') && !_.result(this, 'elasticsearchType')) {
        throw new Error('An "elasticSerachType" property must be specified if an "elasticsearchIndex" property is present');
      }
      if(_.result(this, 'elasticsearchType') && !_.result(this, 'elasticsearchIndex')) {
        throw new Error('An "elasticSerachIndex" property must be specified if an "elasticsearchType" property is present');
      }

      var base =
            _.result(this, 'urlRoot') ||
            _.result(this.collection, 'url') ||
            urlError();
      if(this.isNew()) return base;
      var id = this.get(this.idAttribute);

      if(_.result(this, 'elasticsearchIndex') && _.result(this, 'elasticsearchType')) {
        return this._elasticsearchURL(base, id);
      } else {
        return base.replace(/[^\/]$/, '$&/') +
          encodeURIComponent(id);
      }
    },

    parse: function(response, _) {
      if(this._validResponse(response)) {
        return response._source;
      } else {
        return {};
      }
    },

    _validResponse: function(response) {
      return response && response._source;
    },

    _elasticsearchURL: function(base, id) {
      var elasticsearchIndex = _.result(this, 'elasticsearchIndex');
      var elasticsearchType = _.result(this, 'elasticsearchType');
      return base.replace(/[^\/]$/, '$&/') +
        encodeURIComponent(elasticsearchIndex).replace(/[^\/]$/, '$&/') +
        encodeURIComponent(elasticsearchType).replace(/[^\/]$/, '$&/') +
        encodeURIComponent(id);
    }
  });

  var urlError = function() {
    throw new Error('A "url" property or function must be specified');
  };
})();
