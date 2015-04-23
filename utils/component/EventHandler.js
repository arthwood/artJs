artjs.utils.component.EventHandler = artjs.ComponentEventHandler = artjs.Class(
  function(component, eventId, delegate, type) {
    this._component = component;
    this._eventId = eventId;
    this._delegate = delegate;
    this._type = type;
    this._onEventDelegate = artjs.$D(this, '_onEvent');
    
    artjs.Broadcaster.addListener(this._eventId, this._onEventDelegate);
  },
  {
    _destroy: function() {
      artjs.Broadcaster.removeListener(this._eventId, this._onEventDelegate);
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
