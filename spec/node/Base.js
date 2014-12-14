artjs.SpecNode = artjs.spec.node.Base = artjs.Class(
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
