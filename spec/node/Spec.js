artjs.Spec = artjs.spec.node.Spec = artjs.Class(
  null, 
  {
    execute: function() {
      artjs.SpecRunner.setSubject(this.facet);
      
      this.super(arguments);
    }
  }, 
  null, 
  artjs.SpecNode
);
