artjs.Component = artjs.dom.Component = artjs.Class(
  function(element) {
    this.element = element;
  },
  null,
  {
    _name: 'Component',
    
    idToComponent: {},
    
    _onExtended: function() {
      this.super(arguments);
      
      this.instances = [];
    },
    
    find: function(id) {
      return this.idToComponent[id];
    },
    
    onLoad: function(id, delegate) {
      var component = this.find(id);
      
      if (component) {
        delegate.invoke(component);
      }
      else {
        artjs.ComponentScanner.addListener(id, delegate);
      }
    }
  }
);

artjs.ComponentScanner = {
  _events: {},
  
  scan: function(element) {
    artjs.ArrayUtils.each(artjs.$find(element, '.art'), this._onFound, this);
  },
  
  addListener: function(id, delegate) {
    var event = this._events[id];
    
    if (!event) {
      event = this._events[id] = new artjs.CustomEvent('Component::Load::' + id);
    }
    
    event.add(delegate);
  },
  
  _onFound: function(i) {
    this.initElement(i);
  },
  
  initElement: function(i) {
    this._element = i;
    
    var classnames = artjs.ElementUtils.getClasses(i);
    
    artjs.ArrayUtils.removeItem(classnames, 'art');
    artjs.ArrayUtils.each(classnames, this._eachClassName, this);
  },
  
  _eachClassName: function(i) {
    var path = i.split('-');
    var _class = artjs.ArrayUtils.inject(path, window, this._injectPathChunk, this);
    
    if (_class instanceof Function) {
      var instance = new _class(this._element);
      
      instance.ctor.instances.push(instance);
    
      var id = artjs.ElementUtils.getAttributes(instance.element).id;
      
      if (id) {
        artjs.Component.idToComponent[id] = instance;
      }
      
      var event = this._events[id];
      
      if (event) {
        event.fire(instance);
      }
    }
  },
  
  _injectPathChunk: function(result, i) {
    return result && result[i];
  }
};

artjs.ComponentSweeper = {
  init: function() {
    var clock = new artjs.Clock(2000);
    
    clock.onChange.add(artjs.$D(this, '_onSweep'));
    
    clock.start();
  },
  
  _onSweep: function(clock) {
    artjs.ArrayUtils.each(artjs.Component.subclasses, this._sweepInstances, this);
  },
  
  _sweepInstances: function(i) {
    artjs.ArrayUtils.$select(i.instances, this._isOnStage, this);
  },
  
  _isOnStage: function(i) {
    return artjs.Selector.isDescendantOf(i.element);
  }
};
