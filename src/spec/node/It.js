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
          
          this._runBefores();
          
          this.super();
          
          artjs.Array.each(this._receivers, this._testReceiver, this);
          
          artjs.Spec.getRunner().testComplete();
        }
      }
    },
    
    pushResult: function(result) {
      this._results.push(result);
    },
    
    isSuccess: function() {
      return artjs.Array.all(artjs.Array.pluck(this._results, 'value'));
    },
    
    failureText: function() {
      return artjs.Array.detect(this._results, this._isFailedResult).failureText();
    },
    
    pushReceiver: function(receiver) {
      this._receivers.push(receiver);
    },
    
    getPath: function() {
      return this._path;
    },
    
    _isFailedResult: function(result) { 
      return !result.value; 
    },
    
    _testReceiver: function(receiver) {
      var result = receiver.getResult();
      
      this.pushResult(result);
      
      receiver.rollback();
    },
    
    hasFocus: function() {
      return artjs.Array.any(artjs.Array.pluck(this._path, 'focus')) || this.focus;
    },
    
    _runBefores: function() {
      var instances = artjs.Array.select(this._path, this.ctor._isBefore);
      
      artjs.Array.invoke(instances, 'execute');
    }
  }, 
  {
    instances: [],
    
    resetInstances: function() {
      this.instances = [];
    },
    
    instancesWithFocus: function() {
      return artjs.Array.select(this.instances, this._hasFocus, this);
    },
    
    getRunInstances: function() {
      return artjs.Spec.hasFocus() ? this.instancesWithFocus() : this.instances;
    },
    
    _hasFocus: function(instance) {
      return instance.hasFocus();
    },
    
    _isBefore: function(i) {
      return i.ctor == artjs.Before;
    }
  }, 
  artjs.AutoExecNode
);
