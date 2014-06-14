artjs.Component = artjs.dom.Component = artjs.Class(
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
      this.dependees = artjs.$A(arguments);
      
      artjs.ArrayUtils.each(this.dependees, this._eachDependee, this);
    },
    
    onFound: function(i) {
      this._element = i;
      
      var classnames = artjs.ElementUtils.getClasses(i);
      
      artjs.ArrayUtils.removeItem(classnames, 'art');
      artjs.ArrayUtils.each(classnames, this._eachClassName, this);
    },
    
    _onExtended: function() {
      this.super(arguments);
      
      this.instances = [];
      this.dependants = [];
    },
    
    _init: function() {
      var clock = new artjs.Clock(2000);
      
      clock.onChange.add(artjs.$D(this, this._onSweep));
      
      clock.start();
    },
    
    _onSweep: function(clock) {
      artjs.ArrayUtils.each(this.subclasses, this._sweepInstances, this);
    },
    
    _sweepInstances: function(i) {
      artjs.ArrayUtils.$select(i.instances, this._isOnStage, this);
    },
    
    _isOnStage: function(i) {
      return artjs.Selector.isDescendantOf(i.element);
    },
    
    _eachDependee: function(i) {
      i.dependants.push(this);
    },
    
    _scan: function(element) {
      artjs.ArrayUtils.each(artjs.$find(element, '.art'), this.onFound, this);
    },
    
    _eachClassName: function(i) {
      var path = i.split('-');
      var _class = artjs.ArrayUtils.inject(path, window, this._injectPathChunk, this);
      
      if (_class instanceof Function) {
        this._create(_class);
      }
    },
    
    _create: function(klass) {
      var instance = new klass(this._element);
      
      klass.instances.push(instance);
      
      this._eachDependeeInstance.instance = instance;
      
      var au = artjs.ArrayUtils;
      
      au.each(
        au.flatten(
          au.map(klass.dependees, this._toInstances, this)
        ), 
        this._eachDependeeInstance, 
        this
      );
      
      this._eachDependantInstance.instance = instance;
      
      au.each(
        au.flatten(
          au.map(klass.dependants, this._toInstances, this)
        ), 
        this._eachDependantInstance, 
        this
      );
    },
    
    _toInstances: function(i) {
      return i.instances;
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
