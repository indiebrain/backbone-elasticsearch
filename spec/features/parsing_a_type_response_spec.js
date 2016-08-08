describe("Parsing a type response", function() {

  it("parsing returns a model with the response object's source attributes", sinon.test(function() {
    var PostModel = BackboneElasticsearch.Model.extend({
      urlRoot: "http://example.elasticsearch-instance.com/index/posts"
    });

    var responseBody = JSON.stringify({
      "_index" : "recommendations",
      "_type" : "next-slideshow",
      "_id" : "123",
      "_version" : 2,
      "found" : true,
      "_source":
      {
        "id": 123,
        "title": "Example Post Title"
      }
    });
    var server = sinon.fakeServer.create();
    server.respondWith(
      "GET",
      "http://example.elasticsearch-instance.com/index/posts/123",
      [200, { "Content-Type": "appliction/json" }, responseBody]
    );

    var model = new PostModel({id: 123});
    model.fetch();
    server.respond();

    expect(JSON.stringify(model)).
      to.equal(
        JSON.stringify(new PostModel({"id": 123, "title": "Example Post Title"}))
      );
  }));
});
