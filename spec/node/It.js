artjs.It = artjs.spec.node.It = artjs.Class(
  function(facet, body, focus) {
    this.super(facet, body, focus);
    
    this._results = [];
  }, 
  {
    register: function() {
      this.super();
      
      this.ctor.instances.push(this);
    },
    
    execute: function() {
      artjs.Spec.setCurrentTest(this);
      
      this._path = this.ctor.getPath().concat();
      
      if (artjs.Spec.isRealRun()) {
        if (!artjs.Spec.hasFocus() || this.hasFocus()) {
          this._receivers = [];
          
          this.super();
          
          artjs.ArrayUtils.each(this._receivers, this._testReceiver, this);
          
          artjs.Spec.getRunner().testComplete();
        }
      }
    },
    
    pushResult: function(result) {
      this._results.push(result);
    },
    
    isSuccess: function() {
      return artjs.ArrayUtils.all(artjs.ArrayUtils.pluck(this._results, 'value'));
    },
    
    pushReceiver: function(receiver) {
      this._receivers.push(receiver);
    },
    
    getPath: function() {
      return this._path;
    },
    
    _testReceiver: function(receiver) {
      var result = receiver.getResult();
      
      this.pushResult(result);
      
      receiver.rollback();
    },
    
    hasFocus: function() {
      return artjs.ArrayUtils.any(artjs.ArrayUtils.pluck(this._path, 'focus')) || this.focus;
    }
  }, 
  {
    instances: [],
    
    resetInstances: function() {
      this.instances = [];
    },
    
    instancesWithFocus: function() {
      return artjs.ArrayUtils.select(this.instances, this._hasFocus, this);
    },
    
    _hasFocus: function(instance) {
      return instance.hasFocus();
    }
  }, 
  artjs.AutoExecNode
);