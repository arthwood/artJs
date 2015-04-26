artjs.Model = artjs.model.Base = artjs.Class(
  function() {
    this._channel = new artjs.Channel('Model channel');
    this._onChange = new artjs.Event('Model::onChange');
  },
  {
    addListener: function(delegate) {
      this._onChange.add(delegate);
    },
    
    addProperties: function(props) {
      var properties = artjs.Object.mapValue(props, this._toProperty, this);
      
      Object.defineProperties(this, properties);
      
      artjs.Object.eachPair(props, this._setProperty, this);
    },
    
    addProperty: function(prop, value) {
      Object.defineProperty(this, prop, this._toProperty(prop));
      
      this._setProperty(prop, value);
    },
    
    addPropertyListener: function(prop, delegate) {
      this._channel.addListener(prop, delegate);
      this._firePropertyChange(prop, this.getProperty(prop));
    },
    
    getChannel: function() {
      return this._channel;
    },
    
    getProperty: function(prop) {
      return this[this.ctor.toPrivate(prop)];
    },
    
    onPropertyChange: function(prop, value, oldValue) {
      this._firePropertyChange(prop, value, oldValue);
      this._fireChange(prop, value, oldValue);
    },
    
    removeListener: function(delegate) {
      this._onChange.remove(delegate);
    },
    
    removePropertyListener: function(prop, delegate) {
      this._channel.removeListener(prop, delegate);
    },
    
    setProperties: function(props) {
      artjs.Object.eachPair(props, this.setProperty, this);
    },
    
    setProperty: function(prop, value) {
      this._setProperty(this.ctor.toPrivate(prop), value);
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
    },
    
    _fireChange: function(prop, value, oldValue) {
      this._onChange.fire(prop, value, oldValue);
    },
    
    _firePropertyChange: function(prop, newValue, oldValue) {
      this._channel.fire(prop, {newValue: newValue, oldValue: oldValue});
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
