artjs.Component = artjs.component.Base = artjs.Class(
  function(element) {
    this._element = element;
  },
  {
    getElement: function() {
      return this._element;
    }
  },
  {
    _name: 'Component',
    
    idToComponent: {},
    
    _onExtended: function() {
      this.super();
      
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
    artjs.ArrayUtils.each(artjs.$findAll(element, '.art'), this._onFound, this);
  },
  
  addListener: function(id, delegate) {
    var event = this._events[id];
    
    if (!event) {
      event = this._events[id] = new artjs.Event('Component::Load::' + id);
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
    
      var id = artjs.ElementUtils.getAttributes(instance.getElement()).id;
      
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
  INTERVAL: 2000,
  
  init: function() {
    var clock = new artjs.Clock(this.INTERVAL);
    
    clock.onChange.add(new artjs.Delegate(this, '_onSweep'));
    
    clock.start();
  },
  
  _onSweep: function(clock) {
    artjs.ArrayUtils.each(artjs.Component.subclasses, this._sweepInstances, this);
  },
  
  _sweepInstances: function(i) {
    artjs.ArrayUtils.$select(i.instances, this._isOnStage, this);
  },
  
  _isOnStage: function(i) {
    return artjs.Selector.isDescendantOf(i.getElement());
  }
};

artjs.ComponentSweeper.init();
