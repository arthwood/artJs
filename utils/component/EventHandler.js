artjs.utils.component.EventHandler = artjs.ComponentEventHandler = artjs.Class(
  function(component, eventId, delegate, type) {
    this._component = component;
    this._eventId = eventId;
    this._delegate = delegate;
    this._type = type;
    
    artjs.Broadcaster.addListener(eventId, artjs.$D(this, '_onEvent'));
  },
  {
    getComponent: function() {
      return this._component;
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
    DOWN: 'DOWN',
    SWEEP_INTERVAL: 2000,
    
    init: function() {
      var clock = new artjs.Clock(this.SWEEP_INTERVAL);
      
      clock.onChange.add(artjs.$D(this, '_onTick'));
      
      clock.start();
    },
    
    _onTick: function() {
      artjs.Array.each(artjs.Object.values(artjs.Broadcaster.getEvents()), this._checkEvent, this);
    },
    
    _checkEvent: function(event) {
      artjs.Array.$select(event.getItems(), this._isValidDelegate, this);
    },
    
    _isValidDelegate: function(delegate) {
      var instance = delegate.object;
      
      return (instance.ctor != this) || artjs.Selector.isOnStage(instance.getComponent().getElement());
    }
  }
);
