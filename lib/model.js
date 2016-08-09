var BackboneElasticsearch = BackboneElasticsearch || {};
(function() {
  BackboneElasticsearch.Model = Backbone.Model.extend({
    url: function() {
      if(_.result(this, 'elasticSearchIndex') && !_.result(this, 'elasticSearchType')) {
        throw new Error('An "elasticSerachType" property must be specified if an "elasticSearchIndex" property is present');
      }
      if(_.result(this, 'elasticSearchType') && !_.result(this, 'elasticSearchIndex')) {
        throw new Error('An "elasticSerachIndex" property must be specified if an "elasticSearchType" property is present');
      }

      var base =
            _.result(this, 'urlRoot') ||
            _.result(this.collection, 'url') ||
            urlError();
      if(this.isNew()) return base;
      var id = this.get(this.idAttribute);

      if(_.result(this, 'elasticSearchIndex') && _.result(this, 'elasticSearchType')) {
        return this._elasticSearchURL(base, id);
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

    _elasticSearchURL: function(base, id) {
      var elasticSearchIndex = _.result(this, 'elasticSearchIndex');
      var elasticSearchType = _.result(this, 'elasticSearchType');
      return base.replace(/[^\/]$/, '$&/') +
        encodeURIComponent(elasticSearchIndex).replace(/[^\/]$/, '$&/') +
        encodeURIComponent(elasticSearchType).replace(/[^\/]$/, '$&/') +
        encodeURIComponent(id);
    }
  });

  var urlError = function() {
    throw new Error('A "url" property or function must be specified');
  };
})();
