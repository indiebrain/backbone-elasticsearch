describe("BackboneElasticsearch.Model", function() {

  it("fetches from the model's url", sinon.test(function() {
    var FakeBackboneElasticserachModel = BackboneElasticsearch.Model.extend({
      urlRoot: "http://example.com/index/type"
    });
    var model = new FakeBackboneElasticserachModel({id: "123"});

    expect(model.url()).to.equal("http://example.com/index/type/123");
  }));

  it("errors if the user does not specify a url or urlRoot property", function() {
    var FakeBackboneElasticserachModel = BackboneElasticsearch.Model.extend({});
    var model = new FakeBackboneElasticserachModel({id: "123"});

    expect(function() {
      model.url();
    }).to.throw(Error, 'A "url" property or function must be specified');
  });

  it("allows the user to specify the ElasticSearch index and type of the collection", function() {
    var FakeBackboneElasticserachModel = BackboneElasticsearch.Model.extend({
      elasticSearchIndex: "index",
      elasticSearchType: "type",
      urlRoot: "http://example.com"
    });
    var model = new FakeBackboneElasticserachModel({id: "123"});

    expect(model.url()).to.equal("http://example.com/index/type/123");
  });

  it("errors if the ElasticSearch index is specified but the ElasticSearch type is not", function() {
    var FakeBackboneElasticserachModel = BackboneElasticsearch.Model.extend({
      elasticSearchIndex: "index",
      urlRoot: "http://example.com"
    });
    var model = new FakeBackboneElasticserachModel({id: "123"});

    expect(function() {
      model.url();
    }).to.throw(Error, 'An "elasticSerachType" property must be specified if an "elasticSearchIndex" property is present');
  });

  it("errors if the ElasticSearch type is specified but the ElasticSearch index is not", function() {
    var FakeBackboneElasticserachModel = BackboneElasticsearch.Model.extend({
      elasticSearchType: "type",
      urlRoot: "http://example.com"
    });
    var model = new FakeBackboneElasticserachModel({id: "123"});

    expect(function() {
      model.url();
    }).to.throw(Error, 'An "elasticSerachIndex" property must be specified if an "elasticSearchType" property is present');
  });

  it("parses the '_source' key's attributes from the ElasticSearch type response", function() {
    var expectedObject = {
      id: "expected-id",
      name: "expected-name"
    };
    var response = {
      _source: expectedObject
    };
    var model = new BackboneElasticsearch.Model();

    var parsedObject = model.parse(response);
    expect(parsedObject).
      to.deep.equal(expectedObject);
  });

  it("parses and empty object when the ElasticSearch type response is null", function() {
    var model = new BackboneElasticsearch.Model({});

    expect(model.parse(null)).to.deep.equal({});
  });

  it("parses and empty object when the ElasticSearch type response is empty", function() {
    var model = new BackboneElasticsearch.Model({});

    expect(model.parse({})).to.deep.equal({});
  });

  it("parses and empty object when the ElasticSearch type response is missing a _soruce attribute", function() {
    var model = new BackboneElasticsearch.Model({});

    expect(model.parse({name: "attribute-name"})).to.deep.equal({});
  });
});
