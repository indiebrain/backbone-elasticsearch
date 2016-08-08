describe("Parsing a search response", function() {
  var PostModel = Backbone.Model.extend({});
  var PostsCollection = BackboneElasticsearch.Collection.extend({
    url: "http://example.elasticsearch-instance.com/index/posts/_search",
    model: PostModel
  });

  it("returns an array of objects", sinon.test(function() {
    var responseBody = JSON.stringify({
      "took" : 4,
      "timed_out" : false,
      "_shards" : {
        "total" : 5,
        "successful" : 5,
        "failed" : 0
      },
      "hits" : {
        "total" : 1,
        "max_score" : 1.0,
        "hits" : [
          {
            "_index" : "index",
            "_type" : "post",
            "_id" : "4",
            "_score" : 1.0,
            "_source":{"id": 48007, "title": "Sample Post"}
          }
        ]
      }
    });
    var server = sinon.fakeServer.create();
    server.respondWith(
      "GET",
      "http://example.elasticsearch-instance.com/index/posts/_search",
      [200, { "Content-Type": "appliction/json" }, responseBody]
    );
    var collection = new PostsCollection();

    collection.fetch();
    server.respond();

    expect(collection.size()).to.equal(1);
    expect(JSON.stringify(collection.models[0])).
      to.equal(
        JSON.stringify(new PostModel({"id": 48007, "title": "Sample Post"}))
      );
  }));
});
