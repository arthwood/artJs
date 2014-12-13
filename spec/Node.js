artjs.SpecNode = artjs.spec.Node = artjs.Class(
  function(facet, body) {
    this.facet = facet;
    this.body = body;
  },
  {
    execute: function() {
      artjs.SpecRunner.pushNode(this);
      
      this.body();
      
      artjs.SpecRunner.popNode();
    }
  }
);

artjs.Spec = artjs.Class(null, {
  execute: function() {
    artjs.SpecRunner.setSubject(this.facet);
    
    this.super(arguments);
  }
}, null, artjs.SpecNode);

artjs.Describe = artjs.Class(null, null, null, artjs.SpecNode);

artjs.Context = artjs.Class(null, null, null, artjs.SpecNode);

artjs.It = artjs.Class(
  null, 
  {
    execute: function() {
      artjs.SpecRunner.setIt(this);
      artjs.SpecRunner.resetReceivers();
      
      this.super(arguments);
      
      artjs.SpecRunner.testReceivers();
    }
  }, 
  null, 
  artjs.SpecNode
);
