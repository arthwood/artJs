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
    artjs.Array.each(artjs.$findAll(element, '.art'), this._onFound, this);
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
    
    var classnames = artjs.Element.getClasses(i);
    
    artjs.Array.removeItem(classnames, 'art');
    artjs.Array.each(classnames, this._eachClassName, this);
  },
  
  _eachClassName: function(i) {
    var path = i.split('-');
    var _class = artjs.Array.inject(path, window, this._injectPathChunk, this);
    
    if (_class instanceof Function) {
      var instance = new _class(this._element);
      
      instance.ctor.instances.push(instance);
    
      var id = artjs.Element.getAttributes(instance.getElement()).id;
      
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
    artjs.Array.each(artjs.Component.subclasses, this._sweepInstances, this);
  },
  
  _sweepInstances: function(i) {
    artjs.Array.$select(i.instances, this._isOnStage, this);
  },
  
  _isOnStage: function(i) {
    return artjs.Selector.isDescendantOf(i.getElement());
  }
};

artjs.ComponentSweeper.init();
