ArtJs.Timeout = com.arthwood.events.Timeout = ArtJs.Class(
  function(delay) {
    this._delay = delay;
    this._onTimeoutDC = ArtJs.$DC(this, this._onTimeout);
    this.onComplete = new ArtJs.CustomEvent('Timeout:onComplete');
  }, 
  {
    _onTimeout: function() {
      this.onComplete.fire(this);
    },
    
    start: function(now) {
      this._id = setTimeout(this._onTimeoutDC, this._delay);
    },
    
    isRunning: function() {
      return (this._id !== null);
    }
  },
  {
    fire: function(delegate, delay) {
      var instance = new this(delay);
      
      instance.onComplete.add(delegate);
      instance.start();
      
      return instance;
    }
  }
);
