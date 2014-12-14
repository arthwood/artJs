artjs.It = artjs.spec.node.It = artjs.Class(
  null, 
  {
    execute: function() {
      artjs.SpecRunner.executeIt(this, arguments);
    }
  }, 
  null, 
  artjs.SpecNode
);
