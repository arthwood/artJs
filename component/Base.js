artjs.Component = artjs.component.Base = artjs.Class(
  function(element) {
    this._element = element;
    this._eventHandlers = [];
    
    artjs.$BA(this);
  },
  {
    getElement: function() {
      return this._element;
    },
    
    _fire: function(id) {
      artjs.Broadcaster.fire(id, this);
    },
    
    _handle: function(id, method) {
      this._handleEvent(id, method);
    },
      
    _handleEmit: function(id, method) {
      this._handleEvent(id, method, artjs.ComponentEventHandler.UP);
    },
    
    _handleBroadcast: function(id, method) {
      this._handleEvent(id, method, artjs.ComponentEventHandler.DOWN);
    },
    
    _handleEvent: function(id, method, type) {
      this._eventHandlers.push(new artjs.ComponentEventHandler(this, id, this[method].delegate, type));
    },
    
    _destroy: function() {
      artjs.Array.invoke(this._eventHandlers, 'remove');
    },
    
    _register: function(map) {
      artjs.Object.eachPair(map, this._registerEach, this);
    },
    
    _registerEach: function(k, v) {
      this.ctor.onLoad(k, this[v].delegate);
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
    },
    
    toString: function() {
      return this._name;
    }
  }
);

artjs.ComponentScanner = {
  _channel: new artjs.Channel('ComponentScanner'),
  
  scan: function(element) {
    artjs.Array.each(artjs.$findAll(element, '.art'), this._onFound, this);
  },
  
  addListener: function(id, delegate) {
    this._channel.addListener(id, delegate);
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
    this.instantiateClass(i, this._element);
  },
  
  instantiateClass: function(className, element) {
    var path = className.split('-');
    var _class = artjs.Array.inject(path, window, this._injectPathChunk, this);
    var instance = null;
    
    if (_class instanceof Function) {
      instance = new _class(element);
      
      instance.ctor.instances.push(instance);
    
      var id = artjs.Element.getAttributes(instance.getElement()).id;
      
      if (id) {
        artjs.Component.idToComponent[id] = instance;
      }
      
      this._channel.fire(id, instance);
    }
    
    return instance;
  },
  
  _injectPathChunk: function(result, i) {
    return result && result[i];
  }
};

artjs.ComponentEventHandler = artjs.Class(
  function(component, eventId, delegate, type) {
    this._component = component;
    this._eventId = eventId;
    this._delegate = delegate;
    this._type = type;
    
    artjs.Broadcaster.addListener(eventId, artjs.$D(this, '_onEvent'));
  },
  {
    remove: function() {
      artjs.Broadcaster.removeListener(this._eventId, this._onEvent.delegate);
    },
    
    _onEvent: function(component) {
      var source = component.getElement();
      var target = this._component.getElement();
      var fire;
  
      switch (this._type) {
        case this.ctor.DOWN:
          fire = artjs.Selector.isDescendantOf(target, source);
          break;
        case this.ctor.UP:
          fire = artjs.Selector.isDescendantOf(source, target);
          break;
        default:
          fire = true;
      }
  
      if (fire) {
        this._delegate.invoke(component);
      }
    }
  },
  {
    UP: 'UP',
    DOWN: 'DOWN'
  }
);

artjs.ComponentSweeper = {
  INTERVAL: 1000,
  
  init: function() {
    var sweep = artjs.$D(this, '_onSweep');
    var clock = new artjs.Clock(this.INTERVAL);
    
    clock.onChange.add(sweep);
    
    clock.start();
    
    artjs.$T(sweep, 100);
  },
  
  _onSweep: function() {
    this._sweepSubclasses(artjs.Component);
  },
  
  _sweepSubclasses: function(componentClass) {
    artjs.Array.each(componentClass.subclasses, this._sweep, this);
  },
  
  _sweep: function(i) {
    var instances = artjs.Array.partition(i.instances, this._isOnStage, this);

    artjs.Array.invoke(instances.y, '_destroy');
    
    i.instances = instances.x;
    
    this._sweepSubclasses(i);
  },
  
  _isOnStage: function(i) {
    return artjs.Selector.isOnStage(i.getElement());
  }
};
