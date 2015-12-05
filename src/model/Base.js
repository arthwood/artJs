artjs.Model = artjs.model.Base = artjs.Class(
  function() {
    this._channelSet = new artjs.ChannelSet('Properties');
    this.onChange = new artjs.Event('Model::onChange');
  },
  {
    addProperties: function(props) {
      var properties = artjs.Object.mapValue(props, this._toProperty, this);
      
      Object.defineProperties(this, properties);
      
      artjs.Object.each(props, this._setProperty, this);
    },
    
    addProperty: function(prop, value) {
      Object.defineProperty(this, prop, this._toProperty(prop));
      
      this._setProperty(prop, value);
    },
    
    addPropertyListener: function(prop, delegate, fire) {
      this._channelSet.addListener(prop, delegate);
      
      if (fire) {
        this._channelSet.fire(prop, {newValue: this.getProperty(prop)});
      }
    },
    
    getChannelSet: function() {
      return this._channelSet;
    },
    
    getProperty: function(prop) {
      return this[this.ctor.toPrivate(prop)];
    },
    
    onPropertyChange: function(prop, value, oldValue) {
      this._channelSet.fire(prop, {newValue: value, oldValue: oldValue});
      this.onChange.fire(this, prop, value, oldValue);
    },
    
    removePropertyListener: function(prop, delegate) {
      this._channelSet.removeListener(prop, delegate);
    },
    
    _createGetter: function(name) {
      var result = function() {
        return this.getProperty(arguments.callee.prop);
      };
      
      result.prop = name;
      
      return result;
    },
    
    _createSetter: function(name) {
      var result = function(value) {
        var prop = arguments.callee.prop;
        var oldValue = this.getProperty(prop);

        this._setProperty(this.ctor.toPrivate(prop), value);
        
        this.onPropertyChange(prop, value, oldValue);
      };
      
      result.prop = name;
      
      return result;
    },
    
    _setProperty: function(prop, value) {
      this[prop] = value;
    },
    
    _toProperty: function(name) {
      return {
        configurable: false,
        enumerable: true,
        get: this._createGetter(name),
        set: this._createSetter(name)
      };
    }
  },
  {
    toPrivate: function(i) {
      return '_' + i;
    }
  }
);
