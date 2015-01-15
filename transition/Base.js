artjs.TransitionBase = artjs.transition.Base = artjs.Class(
  function(property, element, value, duration, type, delay, from) {
    this.property = property;
    this.element = element;
    this.duration = artjs.ObjectUtils.getDefault(duration, 1);
    this.value = value;
    this.type = type || this.ctor.LINEAR;
    this.delay = delay || 0;
    this.from = from;
    this._deferredD = artjs.$D(this, '_deferred');
  },
  {
    run: function() {
      if (artjs.ObjectUtils.isPresent(this.from)) {
        this._setStyle(this.from);
        this._setEffectStyle('none');
      }
      
      artjs.Timeout.defer(this._deferredD);
    },
    
    _deferred: function() {
      this._setEffectStyle(this.property);
      this._setStyle(this.value);
    },
    
    _setStyle: function(value) {
      artjs.ElementUtils.setStyle(this.element, this.property, value);
    },
    
    _setEffectStyle: function(prop) {
      var effectStyle = artjs.ElementUtils.transitionStyle(prop, this.duration, this.type, this.delay);

      artjs.ElementUtils.extendStyle(this.element, effectStyle);
    }
  },
  {
    LINEAR: 'linear',
    EASE: 'ease',
    EASE_IN: 'ease-in',
    EASE_IN_OUT: 'ease-in-out',
    EASE_OUT: 'ease-out',
    
    run: function (e, value, duration, type, delay, from) {
      var instance = new this(e, value, duration, type, delay, from);
      
      instance.run();
    }
  }
);
