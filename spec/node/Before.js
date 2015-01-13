artjs.Before = artjs.spec.node.Before = artjs.Class(
  function(body) {
    this.super(arguments, 'before', body, false);
  }, 
  {
    execute: function() {
      if (artjs.Spec.isRealRun()) {
        this.body();
      }
    }
  }, 
  null, 
  artjs.AutoExecNode
);
