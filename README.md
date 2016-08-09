# backbone-elasticsearch

Adapters and Utilities to speak ElasticSearch with Backbone

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
