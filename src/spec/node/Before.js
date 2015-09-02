artjs.Before = artjs.spec.node.Before = artjs.Class(
  function(body) {
    this.super('before', body, false);
  }, 
  {
    register: function() {
      if (artjs.Spec.isRealRun()) {
        this.ctor.getPath().push(this);
      }
    }
  }, 
  null, 
  artjs.AutoExecNode
);
