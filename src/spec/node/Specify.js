artjs.Specify = artjs.spec.node.Specify = artjs.Class(
  null, 
  {
    register: function() {
      this.super();
      
      this.ctor.instances.push(this);
    },
    
    execute: function() {
      artjs.Spec.setSubject(this.facet);
      
      this.super();
    }
  },
  {
    instances: []
  }, 
  artjs.BaseSpecNode
);
