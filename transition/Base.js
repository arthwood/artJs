artjs.TransitionBase = artjs.transition.Base = artjs.Class(
  function(property, element, value, duration, type, delay, from) {
    artjs.$BA(this);
    
    this.property = property;
    this.element = element;
    this.duration = artjs.Object.getDefault(duration, 1);
    this.value = value;
    this.type = type || this.ctor.LINEAR;
    this.delay = delay || 0;
    this.from = from;
  },
  {
    run: function() {
      if (artjs.Object.isPresent(this.from)) {
        this._setEffectStyle('none');
        this._setStyle(this.from);
      }
      
      artjs.Timeout.fire(this._onDeferred.delegate, 100);
    },
    
    _onDeferred: function() {
      this._setEffectStyle(this.property);
      this._setStyle(this.value);
    },
    
    _setStyle: function(value) {
      artjs.Element.setStyle(this.element, this.property, value);
    },
    
    _setEffectStyle: function(prop) {
      var effectStyle = artjs.Element.transitionStyle(prop, this.duration, this.type, this.delay);

      artjs.Element.extendStyle(this.element, effectStyle);
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
