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
    
    addProperty: function(prop, value) {
      this.setProperty(prop, value);
      
      Object.defineProperty(this, prop, this._toProperty(prop));
    },
    
    setProperties: function(props) {
      artjs.Object.eachPair(props, this.setProperty, this);
    },
    
    setProperty: function(prop, value) {
      var privateName = '_' + prop;
      
      this[privateName] = value;
    },
    
    getProperty: function(prop) {
      return this['_' + prop];
    },
    
    addPropertyListener: function(prop, delegate) {
      this._channel.addListener(prop, delegate);
      this._firePropertyChange(prop, this.getProperty(prop));
    },
    
    onPropertyChange: function(prop, value, oldValue) {
      this._firePropertyChange(prop, value, oldValue);
      this._fireModelChange(prop, value, oldValue);
    },
    
    _firePropertyChange: function(prop, value, oldValue) {
      this._channel.fire(prop, {newValue: value, oldValue: oldValue});
    },
    
    _fireModelChange: function(prop, value, oldValue) {
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
        return this.getProperty(arguments.callee.prop);
      };
      
      result.prop = name;
      
      return result;
    },
    
    _createSetter: function(name) {
      var result = function(value) {
        var prop = arguments.callee.prop;
        var oldValue = this.getProperty(prop);

        this.setProperty(prop, value);
        
        this.onPropertyChange(prop, value, oldValue);
      };
      
      result.prop = name;
      
      return result;
    }
  }
);
