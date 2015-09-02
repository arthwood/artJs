artjs.component.utils.EventHandler = artjs.ComponentEventHandler = artjs.Class(
  function(component, eventId, delegate, type, allowSelf) {
    this._component = component;
    this._eventId = eventId;
    this._delegate = delegate;
    this._type = type;
    this._allowSelf = Boolean(allowSelf);
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
      var fire = false;
  
      switch (this._type) {
        case this.ctor.DOWN:
          fire = artjs.Selector.isDescendantOf(target, source);
          break;
        case this.ctor.UP:
          fire = artjs.Selector.isDescendantOf(source, target);
          break;
        default:
          if ((source != target) || this._allowSelf) {
            fire = true;
          }
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
