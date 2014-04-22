ArtJs.TransitionBase = com.arthwood.transition.Base = ArtJs.Class(
  function(property, element, value, duration, type, delay, from) {
    this.property = property;
    this.element = element;
    this.duration = ArtJs.ObjectUtils.getDefault(duration, 1);
    this.value = value;
    this.type = type || this.ctor.LINEAR;
    this.delay = delay || 0;
    this.from = from;
    this._deferredD = ArtJs.$D(this, this._deferred);
  },
  {
    run: function() {
      if (ArtJs.ObjectUtils.isPresent(this.from)) {
        this._setStyle(this.from);
        this._setEffectStyle('none');
      }
      
      ArtJs.Timeout.defer(this._deferredD);
    },
    
    _deferred: function() {
      this._setEffectStyle(this.property);
      this._setStyle(this.value);
    },
    
    _setStyle: function(value) {
      ArtJs.ElementUtils.setStyle(this.element, this.property, value);
    },
    
    _setEffectStyle: function(prop) {
      var effectStyle = ArtJs.ElementUtils.transitionStyle(prop, this.duration, this.type, this.delay);

      ArtJs.ElementUtils.extendStyle(this.element, effectStyle);
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
