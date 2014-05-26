artjs.SpecNode = artjs.spec.Node = artjs.Class(
  function(facet, body) {
    this.facet = facet;
    this.body = body;
  },
  {
    execute: function() {
      runner.path.push(this);
      
      this.body();
      
      runner.path.pop();
    }
  }
);

artjs.Spec = artjs.Class(null, {
  execute: function() {
    runner.subject = this.facet;
    
    this.super(arguments);
  }
}, null, artjs.SpecNode);

artjs.Describe = artjs.Class(null, null, null, artjs.SpecNode);

artjs.Context = artjs.Class(null, null, null, artjs.SpecNode);

artjs.It = artjs.Class(null, {
  execute: function() {
    runner.it = this;
    runner.receivers = [];
    
    this.super(arguments);
    
    runner._testReceivers();
  }
}, null, artjs.SpecNode);

function spec(facet, body) {
  var node = new artjs.Spec(facet, body);
  
  runner.specs.push(node);
}

function _executeNode(type, facet, body) {
  var node = new type(facet, body);

  node.execute();
}

function describe(facet, body) {
  _executeNode(artjs.Describe, facet, body);
}

function context(facet, body) {
  _executeNode(artjs.Context, facet, body);
}

function it(facet, body) {
  _executeNode(artjs.It, facet, body);
}
