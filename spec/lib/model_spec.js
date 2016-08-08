describe("BackboneElasticsearch.Model", function() {

  it("fetches from the model's url", sinon.test(function() {
    var FakeBackboneElasticserachModel = BackboneElasticsearch.Model.extend({
      urlRoot: "http://example.com/posts"
    });
    var model = new FakeBackboneElasticserachModel({id: "123"});

    expect(model.url()).to.equal("http://example.com/posts/123");
  }));

  it("parses the '_source' key's attributes from the ElasticSearch type response", function(){
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
