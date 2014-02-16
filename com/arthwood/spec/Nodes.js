ArtJs.Spec = function (facet, body) {
  this.facet = facet;
  this.body = body;
};

ArtJs.Describe = function(facet, body) {
  this.facet = facet;
  this.body = body;
};

ArtJs.Context = function(facet, body) {
  this.facet = facet;
  this.body = body;
};

ArtJs.It = function(facet, body) {
  this.facet = facet;
  this.body = body;
};

function spec(facet, body) {
  runner.specs.push(new ArtJs.Spec(facet, body));
}

function describe(facet, body) {
  var node = new ArtJs.Describe(facet, body);

  runner.path.push(node);

  node.body();

  runner.path.pop();
}

function context(facet, body) {
  var node = new ArtJs.Context(facet, body);

  runner.path.push(node);

  node.body();

  runner.path.pop();
}

function it(facet, body) {
  var node = new ArtJs.It(facet, body);

  runner.path.push(node);
  runner.receivers = [];
  runner.it = node;
  
  node.body();

  runner.testReceivers();
  runner.path.pop();
}
