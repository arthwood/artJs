ArtJs.ElementEvent = com.arthwood.events.Element = ArtJs.Class(
  function(element, name, delegate) {
    this.element = element;
    this.delegate = delegate;
    
    var on = ArtJs.$DC(this, this._on, false);
    
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

ArtJs.MouseEvent = com.arthwood.events.Mouse = ArtJs.Class(
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
      var s = ArtJs.Selector;
      
      return (t == ct) && !s.isDescendantOf(rt, ct) || s.isDescendantOf(t, ct) && !s.isSelfOrDescendantOf(rt, ct);
    }
  }, null, ArtJs.ElementEvent
);

ArtJs.ClickEvent = com.arthwood.events.Click = ArtJs.Class(
  function(element, delegate) {
    this.super(arguments, element, 'click', delegate);
  }, null, null, ArtJs.ElementEvent
);

ArtJs.MouseMoveEvent = com.arthwood.events.MouseMove = ArtJs.Class(
  function(element, delegate) {
    this.super(arguments, element, 'mousemove', delegate);
  }, null, null, ArtJs.ElementEvent
);

ArtJs.MouseOverEvent = com.arthwood.events.MouseOver = ArtJs.Class(
  function(element, delegate) {
    this.super(arguments, element, 'mouseover', delegate, true);
  }, null, null, ArtJs.MouseEvent
);

ArtJs.MouseOutEvent = com.arthwood.events.MouseOut = ArtJs.Class(
  function(element, delegate) {
    this.super(arguments, element, 'mouseout', delegate, false);
  }, null, null, ArtJs.MouseEvent
);

ArtJs.EventMapping = {
  mousemove: ArtJs.MouseMoveEvent,
  mouseover: ArtJs.MouseOverEvent,
  mouseout: ArtJs.MouseOutEvent,
  click: ArtJs.ClickEvent
};

ArtJs.on = function(target, eventName, delegate) {
  return new ArtJs.EventMapping[eventName](target, delegate);
};
