artjs.BaseSpecRunner = artjs.spec.runner.Base = artjs.Class(
  function() {
    this._it = undefined;
  },
  {
    run: function() {
      artjs.ArrayUtils.invoke(artjs.Specify.instances, 'execute');
    },
    
    setSubject: function(subject) {
      this._subject = subject;
    },
    
    getSubject: function() {
      return this._subject;
    },
    
    setCurrentTest: function(it) {
      this._it = it;
    },
    
    getCurrentTest: function() {
      return this._it;
    }
  }
);
