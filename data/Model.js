artjs.Model = artjs.data.Model = artjs.Class(
  function() {
    this.onChange = new artjs.Event('Model::onChange');
    this._channel = new artjs.Channel('Model channel');
  },
  {
    addProperties: function() {
      var properties = artjs.Object.fromArray(artjs.Array.map(artjs.$A(arguments), this._toPropertyPair, this));
      
      Object.defineProperties(this, properties);
    },
    
    addProperty: function(prop) {
      Object.defineProperty(this, prop, this._toProperty(prop));
    },
    
    setProperty: function(prop, value) {
      var privateName = '_' + prop;
      
      this[privateName] = value;
    },
    
    onPropertyChange: function(prop, delegate) {
      this._channel.addListener(prop, delegate);
    },
    
    _onPropertyChange: function(prop, value, oldValue) {
      this._channel.fire(prop, {newValue: value, oldValue: oldValue});
      
      this.onChange.fire(prop, value, oldValue);
    },
    
    _toPropertyPair: function(prop) {
      return [prop, this._toProperty(prop)];
    },
    
    _toProperty: function(name) {
      return {
        configurable: false,
        enumerable: true,
        get: this._createGetter(name),
        set: this._createSetter(name)
      };
    },
    
    _createGetter: function(name) {
      var result = function() {
        var prop = arguments.callee.prop;
        var privateName = '_' + prop;

        return this[privateName];
      };
      
      result.prop = name;
      
      return result;
    },
    
    _createSetter: function(name) {
      var result = function(value) {
        var prop = arguments.callee.prop;
        var privateName = '_' + prop;
        var oldValue = this[privateName];

        this[privateName] = value;
        this._onPropertyChange(prop, value, oldValue);
      };
      
      result.prop = name;
      
      return result;
    }
  }
);
