artjs.LocalStorage = artjs.model.LocalStorage = artjs.Class(
  function(namespace) {
    this._namespace = namespace;
  },
  {
    getItem: function(name) {
      var key = this._getKey(name);
      
      return JSON.parse(localStorage.getItem(key));
    },
    
    getNamespace: function() {
      return this._namespace;
    },
    
    setItem: function(name, value) {
      var key = this._getKey(name);
      
      if (artjs.Object.isNull(value)) {
        localStorage.removeItem(key);
      }
      else {
        localStorage.setItem(key, JSON.stringify(value));
      }
    },
    
    _getKey: function(name) {
      return this.getNamespace() + ':' + name;
    }
  }
);
