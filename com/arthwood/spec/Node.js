ArtJs.SpecNode = com.arthwood.spec.Node = ArtJs.Class(
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

ArtJs.Spec = ArtJs.Class(null, {
  execute: function() {
    runner.subject = this.facet;
    
    this.super(arguments);
  }
}, null, ArtJs.SpecNode);

ArtJs.Describe = ArtJs.Class(null, null, null, ArtJs.SpecNode);

ArtJs.Context = ArtJs.Class(null, null, null, ArtJs.SpecNode);

ArtJs.It = ArtJs.Class(null, {
  execute: function() {
    runner.it = this;
    runner.receivers = [];
    
    this.super(arguments);
    
    runner._testReceivers();
  }
}, null, ArtJs.SpecNode);

function spec(facet, body) {
  var node = new ArtJs.Spec(facet, body);
  
  runner.specs.push(node);
}

function _executeNode(type, facet, body) {
  var node = new type(facet, body);

  node.execute();
}

function describe(facet, body) {
  _executeNode(ArtJs.Describe, facet, body);
}

function context(facet, body) {
  _executeNode(ArtJs.Context, facet, body);
}

function it(facet, body) {
  _executeNode(ArtJs.It, facet, body);
}
