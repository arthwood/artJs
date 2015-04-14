artjs.ElementEvent = artjs.events.Element = artjs.Class(
  function(element, name, delegate) {
    this._element = element;
    this._delegate = delegate;
    
    artjs.$BA(this);
    
    element.addEventListener(name, this._onEvent, false);
  },
  {
    getElement: function () {
      return this._element;
    },
    
    getTargets: function(e, over) {
      if (e.target) {
        return {origin: e.target, current: e.currentTarget, related: e.relatedTarget};
      }
      else {
        var originRelated = [e.fromElement, e.toElement];

        if (over) originRelated.reverse();

        return {origin: originRelated[0], current: this._element, related: originRelated[1]};
      }
    },
    
    _onEvent: function(e) {
      this._delegate.invoke(e, this);
    }
  }
);

artjs.MouseEvent = artjs.events.Mouse = artjs.Class(
  function(element, name, delegate, on) {
    this.super(element, name, delegate);

    this.over = false;
    this.on = on;
  },
  {
    _onEvent: function(e) {
      if (this._edge(e) && !(this.on == this.over)) {
        this.over = this.on;
        this.super(e);
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

artjs.AbstractClickEvent = artjs.events.AbstractClick = artjs.Class(
  function(element, name, delegate, selector) {
    this.super(element, name, delegate);
    
    this._selector = selector;
  }, 
  {
    _onEvent: function(e) {
      if (!this._selector || this._matchesSelector(e)) {
        this.super(e);
      }
    },
    
    _matchesSelector: function(e) {
      var elements = artjs.$findAll(this._element, this._selector);

      return artjs.Array.contains(elements, e.target);
    }
  }, null, artjs.ElementEvent
);

artjs.ClickEvent = artjs.events.Click = artjs.Class(
  function(element, delegate, selector) {
    this.super(element, 'click', delegate, selector);
  },
  null,
  null,
  artjs.AbstractClickEvent
);
  
artjs.DoubleClickEvent = artjs.events.DoubleClick = artjs.Class(
  function(element, delegate, selector) {
    this.super(element, 'dblclick', delegate, selector);
  },
  null,
  null,
  artjs.AbstractClickEvent
);

artjs.KeyEvent = artjs.events.Key = artjs.Class(
  function(element, delegate, key) {
    this.super(element, 'keydown', delegate);
    
    this._key = key;
  }, 
  {
    _onEvent: function(e) {
      var char = e.which || e.keyCode;
      
      if (!this._key || this._key == char) {
        this.super(e);
      }
    }
  }, null, artjs.ElementEvent
);

artjs.MouseMoveEvent = artjs.events.MouseMove = artjs.Class(
  function(element, delegate) {
    this.super(element, 'mousemove', delegate);
  }, null, null, artjs.ElementEvent
);

artjs.MouseOverEvent = artjs.events.MouseOver = artjs.Class(
  function(element, delegate) {
    this.super(element, 'mouseover', delegate, true);
  }, null, null, artjs.MouseEvent
);

artjs.MouseOutEvent = artjs.events.MouseOut = artjs.Class(
  function(element, delegate) {
    this.super(element, 'mouseout', delegate);
  }, null, null, artjs.MouseEvent
);

artjs.ChangeEvent = artjs.events.Change = artjs.Class(
  function(element, delegate) {
    this.super(element, 'change', delegate);
  }, null, null, artjs.ElementEvent
);

artjs.BlurEvent = artjs.events.Blur = artjs.Class(
  function(element, delegate) {
    this.super(element, 'blur', delegate);
  }, null, null, artjs.ElementEvent
);

artjs.EventMapping = {
  mousemove: 'MouseMoveEvent',
  mouseover: 'MouseOverEvent',
  mouseout: 'MouseOutEvent',
  click: 'ClickEvent',
  dblclick: 'DoubleClickEvent',
  change: 'ChangeEvent',
  keydown: 'KeyEvent',
  blur: 'BlurEvent'
};

artjs.on = function(eventName, target, delegate, selectorOrKey) {
  return new artjs[artjs.EventMapping[eventName]](target, delegate, selectorOrKey);
};
