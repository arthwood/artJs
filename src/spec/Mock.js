artjs.Mock = artjs.spec.Mock = artjs.Class(
  function(stubs) {
    artjs.Array.each(stubs, this.extend, this);
  },
  {
    extend: function(stub) {
      this[stub] = function() {};
    },
    
    toString: function() {
      return this.ctor.toString();
    }
  },
  {
    _name: 'Mock',
    
    toString: function() {
      return this._name;
    }
  }
);
