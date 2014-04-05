ArtJs.QueuedClock = com.arthwood.events.QueuedClock = ArtJs.class(
  function(interval) {
    this.interval = interval;
    this.queue = new ArtJs.Queue();
    this.clock = new ArtJs.Clock(this.interval);
    this.clock.onChange.add(ArtJs.$DC(this, this.start));
  }, 
  {
    start: function() {
      if (this.queue.isEmpty()) {
        this.clock.stop();
      }
      else {
        this.queue.getItem().invoke();
      }
    },
    
    addItem: function(i) {
      this.queue.addItem(i);
    
      if (!this.clock.isRunning()) {
        this.clock.start(true);
      }
    },
    
    getLength: function() {
      return this.queue.getLength();
    },
    
    isBusy: function() {
      return !this.queue.isEmpty();
    }
  }
);
