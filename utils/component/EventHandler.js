artjs.utils.component.EventHandler = artjs.ComponentEventHandler = artjs.Class(
  function(component, eventId, delegate, type) {
    artjs.$BA(this);
    
    this._component = component;
    this._eventId = eventId;
    this._delegate = delegate;
    this._type = type;
    
    artjs.Broadcaster.addListener(eventId, this._onEvent.delegate);
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
