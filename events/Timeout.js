artjs.Timeout = artjs.events.Timeout = artjs.Class(
  function(delay) {
    artjs.Delegate.bindAll(this);
    
    this._delay = delay;
    this.onComplete = new artjs.Event('Timeout:onComplete');
  }, 
  {
    start: function() {
      this._id = setTimeout(this._onTimeout, this._delay);
    },
    
    isRunning: function() {
      return (this._id !== null);
    },
    
    getDelay: function() {
      return this._delay;
    },
    
    _onTimeout: function() {
      delete this._id;
      
      this.onComplete.fire(this);
    }
  },
  {
    fire: function(delegate, delay) {
      var instance = new this(delay);
      
      instance.onComplete.add(delegate);
      instance.start();
      
      return instance;
    },
    
    defer: function(delegate) {
      return this.fire(delegate, 0);
    }
  }
);
