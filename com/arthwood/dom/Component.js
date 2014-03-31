ArtJs.Component = com.arthwood.dom.Component = ArtJs.Class(
  function(element) {
    this.element = element;
  },
  null,
  {
    scan: function(element) {
      ArtJs.ArrayUtils.each(ArtJs.$find(element, '.art'), this._init, this);
    },
    
    dependsOn: function() {
      this.dependees = ArtJs.$A(arguments);
      
      ArtJs.ArrayUtils.each(this.dependees, this._eachDependee, this);
    },
    
    _eachDependee: function(i) {
      (i.dependants = i.dependants || []).push(this);
    },
    
    _init: function(i) {
      this._element = i;
      
      var classnames = ArtJs.ElementUtils.getClasses(i);
      
      ArtJs.ArrayUtils.removeItem(classnames, 'art');
      ArtJs.ArrayUtils.each(classnames, this._eachClassName, this);
    },
    
    _eachClassName: function(i) {
      var path = i.split('-');
      var _class = ArtJs.ArrayUtils.inject(path, window, this._injectPathChunk, this);
      
      if (_class instanceof Function) {
        var instance = new _class(this._element);
        
        (_class.instances = _class.instances || []).push(instance);
        
        this._eachDependeeInstance.instance = instance;
        
        ArtJs.ArrayUtils.each(
          ArtJs.ArrayUtils.flatten(
            ArtJs.ArrayUtils.map(_class.dependees, this._toInstances, this)
          ), 
          this._eachDependeeInstance, 
          this
        );
        
        this._eachDependantInstance.instance = instance;
        
        ArtJs.ArrayUtils.each(
          ArtJs.ArrayUtils.flatten(
            ArtJs.ArrayUtils.map(_class.dependants, this._toInstances, this)
          ), 
          this._eachDependantInstance, 
          this
        );
      }
    },
    
    _toInstances: function(i) {
      return (i.instances = i.instances || []);
    },
    
    _eachDependeeInstance: function(i) {
      var instance = arguments.callee.instance;
      
      instance.onDependency(i);
    },
    
    _eachDependantInstance: function(i) {
      var instance = arguments.callee.instance;
      
      i.onDependency(instance);
    },
    
    _injectPathChunk: function(result, i) {
      return result && result[i];
    }
  }
);
