ArtJs.Timeout = com.arthwood.events.Timeout = ArtJs.Class(
  function(delay) {
    this._delay = delay;
    this._onTimeoutDC = ArtJs.$DC(this, this._onTimeout);
    this.onComplete = new ArtJs.CustomEvent('Timeout:onComplete');
  }, 
  {
    start: function() {
      this._id = setTimeout(this._onTimeoutDC, this._delay);
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
