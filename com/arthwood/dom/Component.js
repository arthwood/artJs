ArtJs.Component = com.arthwood.dom.Component = ArtJs.Class(
  function(element) {
    this.element = element;
  },
  {
    onDependency: function() {
    }
  },
  {
    _name: 'Component',
    
    dependsOn: function() {
      this.dependees = ArtJs.$A(arguments);
      
      ArtJs.ArrayUtils.each(this.dependees, this._eachDependee, this);
    },
    
    _onExtended: function() {
      this.super(arguments);
      
      this.instances = [];
      this.dependants = [];
    },
    
    _init: function() {
      var clock = new ArtJs.Clock(2000);
      
      clock.onChange.add(ArtJs.$D(this, this._onSweep));
      
      clock.start();
    },
    
    _onSweep: function(clock) {
      ArtJs.ArrayUtils.each(this.subclasses, this._sweepInstances, this);
    },
    
    _sweepInstances: function(i) {
      ArtJs.ArrayUtils.$select(i.instances, this._isOnStage, this);
    },
    
    _isOnStage: function(i) {
      return ArtJs.Selector.isDescendantOf(i.element);
    },
    
    _eachDependee: function(i) {
      i.dependants.push(this);
    },
    
    _scan: function(element) {
      ArtJs.ArrayUtils.each(ArtJs.$find(element, '.art'), this._onFound, this);
    },
    
    _onFound: function(i) {
      this._element = i;
      
      var classnames = ArtJs.ElementUtils.getClasses(i);
      
      ArtJs.ArrayUtils.removeItem(classnames, 'art');
      ArtJs.ArrayUtils.each(classnames, this._eachClassName, this);
    },
    
    _eachClassName: function(i) {
      var path = i.split('-');
      var _class = ArtJs.ArrayUtils.inject(path, window, this._injectPathChunk, this);
      
      if (_class instanceof Function) {
        this._create(_class);
      }
    },
    
    _create: function(_class) {
      var instance = new _class(this._element);
      
      _class.instances.push(instance);
      
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
