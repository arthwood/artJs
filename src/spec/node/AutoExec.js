artjs.AutoExecNode = artjs.spec.node.AutoExec = artjs.Class(
  null, 
  {
    register: function() {
      this.super();
      
      this.execute();
    }
  }, 
  null, 
  artjs.BaseSpecNode
);
