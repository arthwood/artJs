ArtJs.Clock = com.arthwood.events.Clock = ArtJs.Class(
  function(interval, repeat) {
    this._interval = interval;
    this._repeat = repeat;
    this._intervalId = null;
    this._counter = 0;
    this._tickDC = ArtJs.$DC(this, this._tick); 
    this.onChange = new ArtJs.CustomEvent('Clock:onChange');
    this.onComplete = new ArtJs.CustomEvent('Clock:onComplete');
  }, 
  {
    start: function(now) {
      this.stop();
      this.resume(now);
    },
    
    _tick: function() {
      this._counter++;
      this.onChange.fire(this);
    
      if (this._counter == this._repeat) {
        this.stop();
        this.onComplete.fire(this);
      }
    },
    
    stop: function() {
      this.pause();
      
      this._counter = 0;
    },
    
    pause: function() {
      clearInterval(this._intervalId);
      this._intervalId = null;
    },
    
    resume: function(now) {
      this._intervalId = setInterval(this._tickDC, this._interval);
      
      if (now) {
        this._tick();
      }
    },
    
    isRunning: function() {
      return (this._intervalId !== null);
    }
  },
  {
    fire: function(delegate, delay, repeat) {
      var clock = new ArtJs.Clock(delegate, delay, repeat);
      
      clock.start();
      
      return clock;
    }
  }
);
