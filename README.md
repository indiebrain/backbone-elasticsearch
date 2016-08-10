# backbone-elasticsearch

Adapters and Utilities to speak ElasticSearch with Backbone

## Usage

### Models

The BakcboneElasticsearch.Model is an extension of the
Backbone.Model. It adds the capability to parse an Elasticsearch
singular-type-resource document into a model object.

```javascript
var PostModel = BackboneElasticsearch.Model.extend({
    urlRoot: "http://example.elasticsearch-instance.com/indexName/typeName",
});
var post = new PostModel({id: 1});
post.fetch();
```

It also provides some convenience properties for specifying the the
index and collection with which a model is associated:

```javascript
var PostModel = BackboneElasticsearch.Model.extend({
    urlRoot: "http://example.elasticsearch-instance.com",
    elasticsearchIndex: "indexName",
    elasticsearchType: "typeName"
});
var post = new PostModel({id: 1});
post.url(); // => http://example.elasticsearch-instance.com/indexName/typeName/1
```

### Collections

The BackboneElasticserach.Collection is an extension of the
Backbone.Collection. It adds the capability to parse an ElasticSearch
collection-type-resource. This is useful for parsing whole collections
of documents or results of a particular search.

```javascript
var PostsCollection = BackboneElasticsearch.Collection.extend({
    urlRoot: "http://example.elasticsearch-instance.com/indexName/typeName/_search",
    model: PostModel
});
var posts = new PostsCollection();
posts.fetch()
```

## Development

### Dependencies

* NodeJS
  `brew install node`

  Note: This project DOES NOT have a runtime dependency on
  Node. NodeJS is required ONLY for managing development dependencies;
  testing, linting, compiling, etc. The sources are intentionally kept
  free of Node so that they may be used outside the context of a Node
  application.

  Required for the Node Package Manager (NPM)
  https://nodejs.org/en/

* PhantomJS 2+
  `brew install phantomjs`

  Required to run the test suite.

* JRE 8+

  `brew cask install java`

  Required only to run the Google Closure Compiler to produce the
  final "compiled" `bin/backbone-elasticsearch.js` file.

### Getting Started

* Install dependencies

```shell
$ npm install
```

### Linting
```shell
$ npm run-script lint
```

### Running Tests

```shell
$ npm run-script specs
```

### Compiling

```shell
$ npm run-script build
```

* _NOTE: Outputs to the `<projectRoot>/build` directory_
