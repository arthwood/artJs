artjs.It = artjs.spec.node.It = artjs.Class(
  function() {
    this.super(arguments);
    
    this._results = [];
  }, 
  {
    execute: function() {
      artjs.SpecRunner.executeIt(this, arguments);
    },
    
    pushResult: function(result) {
      this._results.push(result);
    },
    
    getResults: function() {
      return this._results;
    },
    
    setPath: function(path) {
      this._path = path;
    },
    
    getPath: function() {
      return this._path;
    },
    
    isSuccess: function() {
      return artjs.ArrayUtils.all(artjs.ArrayUtils.pluck(this.getResults(), 'value'));
    }
  }, 
  null, 
  artjs.SpecNode
);
