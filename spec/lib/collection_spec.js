describe("BackboneElasticsearch.Collection", function() {

  it("fetches from collection's url attribute", sinon.test(function() {
    var FakeBackboneElasticserachCollection = BackboneElasticsearch.Collection.extend({
      url: "http://example.com"
    });
    var collection = new FakeBackboneElasticserachCollection();

    expect(collection.url).to.equal("http://example.com");
  }));

  it("parses source objects from the ElasticSearch response", function() {
    var expectedObject = {
      id: "expected-id",
      name: "expected-name"
    };
    var response = {
      hits: {
        hits: [
          {
            _source: expectedObject
          }
        ]
      }
    };
    var collection = new BackboneElasticsearch.Collection();

    var parsedResponse = collection.parse(response);

    expect(parsedResponse.length).to.equal(1);
    var parsedObject = parsedResponse[0];
    expect(parsedObject).
      to.deep.equal(expectedObject);
  });
  it("parses an empty array when the response is null", function() {
    var collection = new BackboneElasticsearch.Collection();

    var parsedResponse = collection.parse(null);
    expect(parsedResponse).to.deep.equal([]);
  });

  it("parses an empty array when the response is empty", function() {
    var response = [];
    var collection = new BackboneElasticsearch.Collection();

    var parsedResponse = collection.parse(null);
    expect(parsedResponse).to.deep.equal([]);
  });

  it("parses an empty array when the response is not of the expected form", function() {
    var response = { hits: { unexpected: {}}};
    var collection = new BackboneElasticsearch.Collection();

    var parsedResponse = collection.parse(null);
    expect(parsedResponse).to.deep.equal([]);
  });
});
