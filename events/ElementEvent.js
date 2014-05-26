artjs.ElementEvent = artjs.events.Element = artjs.Class(
  function(element, name, delegate) {
    this.element = element;
    this.delegate = delegate;
    
    var on = artjs.$DC(this, this._on, false);
    
    if (element.addEventListener) {
      element.addEventListener(name, on, false);
    }
    else {
      element.attachEvent('on' + name, on);
    }
  },
  {
    getTargets: function(e, over) {
      if (e.target) {
        return {origin: e.target, current: e.currentTarget, related: e.relatedTarget};
      }
      else {
        var originRelated = [e.fromElement, e.toElement];

        if (over) originRelated.reverse();

        return {origin: originRelated[0], current: this.element, related: originRelated[1]};
      }
    },
    
    _on: function(e) {
      this.delegate.invoke(e, this);
    }
  }
);

artjs.MouseEvent = artjs.events.Mouse = artjs.Class(
  function(element, name, delegate, on) {
    this.super(arguments, element, name, delegate);

    this.over = false;
    this.on = on;
  },
  {
    _on: function(e) {
      if (this._edge(e) && !(this.on == this.over)) {
        this.over = this.on;
        this.super(arguments, e);
      }
    },
    
    _edge: function(e) {
      var targets = this.getTargets(e, this.on);
      var t = targets.origin;
      var ct = targets.current;
      var rt = targets.related;
      var s = artjs.Selector;
      
      return (t == ct) && !s.isDescendantOf(rt, ct) || s.isDescendantOf(t, ct) && !s.isSelfOrDescendantOf(rt, ct);
    }
  }, null, artjs.ElementEvent
);

artjs.ClickEvent = artjs.events.Click = artjs.Class(
  function(element, delegate) {
    this.super(arguments, element, 'click', delegate);
  }, null, null, artjs.ElementEvent
);

artjs.MouseMoveEvent = artjs.events.MouseMove = artjs.Class(
  function(element, delegate) {
    this.super(arguments, element, 'mousemove', delegate);
  }, null, null, artjs.ElementEvent
);

artjs.MouseOverEvent = artjs.events.MouseOver = artjs.Class(
  function(element, delegate) {
    this.super(arguments, element, 'mouseover', delegate, true);
  }, null, null, artjs.MouseEvent
);

artjs.MouseOutEvent = artjs.events.MouseOut = artjs.Class(
  function(element, delegate) {
    this.super(arguments, element, 'mouseout', delegate, false);
  }, null, null, artjs.MouseEvent
);

artjs.EventMapping = {
  mousemove: artjs.MouseMoveEvent,
  mouseover: artjs.MouseOverEvent,
  mouseout: artjs.MouseOutEvent,
  click: artjs.ClickEvent
};

artjs.on = function(target, eventName, delegate) {
  return new artjs.EventMapping[eventName](target, delegate);
};
